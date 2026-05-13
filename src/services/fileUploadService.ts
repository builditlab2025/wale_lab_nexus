// src/services/fileUploadService.ts

import axios, { AxiosError } from "axios";
import {
  FileUploadResponse,
  FileListResponse,
  FileDeleteResponse,
  PresignedViewUrlResponse,
} from "../types/file/file.types";
import { ErrorResponse, ValidationError } from "../types/auth/auth.types";
import { authService } from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.lab.wale.university";

class FileUploadService {
  private api = axios.create({
    baseURL: `${API_BASE_URL}/wl/api/v1`,
    timeout: 520000, // Longer timeout for file uploads
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  private publicApi = axios.create({
    baseURL: `${API_BASE_URL}/wl/api/v1`,
    timeout: 520000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  constructor() {
    // Add request interceptor to include auth token for protected endpoints
    this.api.interceptors.request.use(
      (config) => {
        const userInfo = authService.getUserInfo();
        if (userInfo?.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Add response interceptor to handle 401 errors for protected endpoints
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  private handleError(error: AxiosError<ErrorResponse>): never {
    console.error("File Upload API Error:", error);

    const responseData = error.response?.data;

    if (responseData) {
      // Check for nested response structure (standard error format)
      if (responseData.response?.message) {
        throw new Error(responseData.response.message);
      }

      // Check for validation errors array
      if (responseData.errors && Array.isArray(responseData.errors)) {
        const errorMessages = responseData.errors
          .map((err: ValidationError) => err.msg)
          .join(", ");
        throw new Error(errorMessages || "Validation failed");
      }

      // Check for direct message property
      if (responseData.message) {
        throw new Error(responseData.message);
      }
    }

    // Network errors
    if (error.code === "NETWORK_ERROR" || error.code === "ECONNREFUSED") {
      throw new Error(
        "Unable to connect to server. Please check your connection.",
      );
    }

    // HTTP status based errors
    if (error.response?.status === 401) {
      throw new Error("Unauthorized access. Please login again.");
    }

    if (error.response?.status === 403) {
      throw new Error("Access forbidden. Insufficient permissions.");
    }

    if (error.response?.status === 404) {
      throw new Error("File not found.");
    }

    if (error.response?.status === 413) {
      throw new Error("File too large. Maximum file size is 50MB.");
    }

    if (error.response?.status === 400) {
      throw new Error("Invalid request. Please check your file or input.");
    }

    // Fallback error
    throw new Error(error.message || "An unexpected error occurred");
  }

  // ============================================
  // FILE UPLOAD ENDPOINTS
  // ============================================

  /**
   * Upload a single file (Public - No Authentication Required)
   * @param file - The file to upload
   */
  async uploadSingleFile(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.publicApi.post<{
        code: number;
        status: string;
        message: string;
        data: FileUploadResponse;
      }>("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Return the inner data object, not the wrapper
      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Upload multiple files (max 10) - Requires Authentication
   * @param files - Array of files to upload
   */
  async uploadMultipleFiles(files: File[]): Promise<FileUploadResponse[]> {
    try {
      if (files.length > 10) {
        throw new Error("Maximum 10 files can be uploaded at once");
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await this.api.post<FileUploadResponse[]>(
        "/files/upload-multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get all files for the current user (paginated) - Requires Authentication
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 20)
   */
  async getUserFiles(
    page: number = 1,
    limit: number = 20,
  ): Promise<FileListResponse> {
    try {
      const response = await this.api.get<FileListResponse>(
        `/files?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get all files (Admin/Editor only) - Requires Authentication
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 20)
   */
  async getAllFiles(
    page: number = 1,
    limit: number = 20,
  ): Promise<FileListResponse> {
    try {
      const response = await this.api.get<FileListResponse>(
        `/files/all?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get a specific file by ID - Requires Authentication
   * @param fileId - The file ID
   */
  async getFileById(fileId: string): Promise<FileUploadResponse> {
    try {
      const response = await this.api.get<FileUploadResponse>(
        `/files/${fileId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Delete a file - Requires Authentication
   * @param fileId - The file ID to delete
   */
  async deleteFile(fileId: string): Promise<FileDeleteResponse> {
    try {
      const response = await this.api.delete<FileDeleteResponse>(
        `/files/${fileId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * Get a presigned URL for viewing a file (for secure file access) - Requires Authentication
   * @param fileId - The file ID
   */
  async getPresignedViewUrl(fileId: string): Promise<PresignedViewUrlResponse> {
    try {
      const response = await this.api.get<PresignedViewUrlResponse>(
        `/files/${fileId}/view`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }
}

export const fileUploadService = new FileUploadService();
