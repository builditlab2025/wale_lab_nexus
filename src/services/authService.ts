// src/services/authService.ts - Update login and store permissions

import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  RegisterAdminDto,
  RegisterUserDto,
  RegisterMenteeMentorDto,
  LoginDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
  AuthResponse,
  OTPResponse,
  ErrorResponse,
  UserInfo,
  ApiUserData,
  ValidationError,
  ApiErrorResponse,
  Permissions,
} from "../types/auth/auth.types";
import {
  getDecryptedUserInfo,
  storeUserInfo,
  clearUserInfo,
} from "../utilities/utils/encrytion";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.lab.wale.university";

class AuthService {
  private api = axios.create({
    baseURL: `${API_BASE_URL}/wl/api/v1`,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Callback for session expiration (set by AppContext)
  private onSessionExpiredCallback: (() => void) | null = null;

  constructor() {
    this.api.interceptors.request.use(
      (config) => {
        const userInfo = this.getUserInfo();
        if (userInfo?.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor for 401 handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          // Call the session expired callback if registered
          if (this.onSessionExpiredCallback) {
            this.onSessionExpiredCallback();
          }

          // Clear local auth data
          this.clearAuth();

          // Throw a more descriptive error
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.response?.message ||
            "Your session has expired. Please login again.";
          throw new Error(errorMessage);
        }
        return Promise.reject(error);
      },
    );
  }

  // Register session expired callback
  registerSessionExpiredCallback(callback: () => void): void {
    this.onSessionExpiredCallback = callback;
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  private handleError(error: AxiosError<ErrorResponse>): never {
    console.error("API Error:", error);

    const responseData = error.response?.data;

    // Check for session expired message from backend
    if (error.response?.status === 401) {
      const message =
        responseData?.message ||
        responseData?.response?.message ||
        "Your session has expired. Please login again.";
      throw new Error(message);
    }

    if (responseData) {
      if (responseData.response?.message) {
        throw new Error(responseData.response.message);
      }

      if (responseData.errors && Array.isArray(responseData.errors)) {
        const errorMessages = responseData.errors
          .map((err: ValidationError) => err.msg)
          .join(", ");
        throw new Error(errorMessages || "Validation failed");
      }

      if (responseData.message) {
        throw new Error(responseData.message);
      }
    }

    if (error.code === "NETWORK_ERROR" || error.code === "ECONNREFUSED") {
      throw new Error(
        "Unable to connect to server. Please check your connection.",
      );
    }

    if (error.response?.status === 403) {
      throw new Error("Access forbidden. Insufficient permissions.");
    }

    if (error.response?.status === 400) {
      throw new Error("Invalid request. Please check your input.");
    }

    throw new Error(error.message || "An unexpected error occurred");
  }

  private convertToUserInfo(userData: ApiUserData, token: string): UserInfo {
    return {
      id: userData.id || "",
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      email: userData.email,
      role: userData.role || "USER",
      role_name: userData.role_name || null,
      is_verified: userData.is_verified || false,
      profile: userData.profile || null,
      profile_completed: userData.profile_completed || false,
      token: token,
      created_at: userData.created_at || new Date().toISOString(),
      updated_at: userData.updated_at || new Date().toISOString(),
      permissions: userData.permissions, // Add permissions
    };
  }

  private storeUserInfo(userInfo: UserInfo): string {
    return storeUserInfo(userInfo);
  }

  getUserInfo(): UserInfo | null {
    return getDecryptedUserInfo();
  }

  getUserRoleName(): string | null {
    return this.getUserInfo()?.role_name || null;
  }

  // Get permissions from stored user info
  getUserPermissions(): Permissions | null {
    const userInfo = this.getUserInfo();
    return userInfo?.permissions || null;
  }

  // Check if user has specific permission
  hasPermission(module: string, action: string): boolean {
    const permissions = this.getUserPermissions();
    if (!permissions) return false;

    const modulePerms = permissions[module];
    if (!modulePerms) return false;

    return modulePerms[action as keyof typeof modulePerms] === true;
  }

  // ============================================
  // AUTH ENDPOINTS
  // ============================================

  async registerAdmin(data: RegisterAdminDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string | null;
  }> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/auth/register/admin",
        data,
      );

      let encryptedUserInfo: string | null = null;

      if (response.data.data.token && response.data.data.user) {
        const userInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: response.data.data.permissions,
          },
          response.data.data.token,
        );
        encryptedUserInfo = this.storeUserInfo(userInfo);
      }

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async registerUser(data: RegisterUserDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string | null;
  }> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/auth/register/user",
        data,
      );

      let encryptedUserInfo: string | null = null;

      if (response.data.data.token && response.data.data.user) {
        const userInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: response.data.data.permissions,
          },
          response.data.data.token,
        );
        encryptedUserInfo = this.storeUserInfo(userInfo);
      }

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async registerMenteeMentor(data: RegisterMenteeMentorDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string | null;
  }> {
    try {
      const formData = new FormData();

      // Append all text fields
      formData.append("first_name", data.first_name);
      if (data.middle_names) formData.append("middle_names", data.middle_names);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);
      formData.append("role", data.role);
      formData.append("program_id", data.program_id);
      formData.append("research_item_id", data.research_item_id);
      formData.append("accepted_terms", String(data.accepted_terms));

      // Handle form_data (can include uploaded_document_url)
      if (data.form_data) {
        Object.entries(data.form_data).forEach(([key, value]) => {
          formData.append(`form_data[${key}]`, String(value));
        });
      }

      // PRIORITY: Direct file upload takes precedence over URL
      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await this.api.post<AuthResponse>(
        "/auth/register/mentee-mentor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      let encryptedUserInfo: string | null = null;

      if (response.data.data.token && response.data.data.user) {
        const userInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: response.data.data.permissions,
          },
          response.data.data.token,
        );
        encryptedUserInfo = this.storeUserInfo(userInfo);
      }

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async login(data: LoginDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string;
  }> {
    try {
      const response = await this.api.post<AuthResponse>("/auth/login", data);

      if (!response.data.data.token || !response.data.data.user) {
        throw new Error("Invalid response from server");
      }

      // Include permissions in user info
      const userInfo = this.convertToUserInfo(
        {
          ...response.data.data.user,
          permissions: response.data.data.permissions,
        },
        response.data.data.token,
      );
      const encryptedUserInfo = this.storeUserInfo(userInfo);

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async verifyEmail(data: VerifyOtpDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string | null;
  }> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/auth/verify-email",
        data,
      );

      let encryptedUserInfo: string | null = null;

      if (response.data.data.token && response.data.data.user) {
        const userInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: response.data.data.permissions,
          },
          response.data.data.token,
        );
        encryptedUserInfo = this.storeUserInfo(userInfo);
      }

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async resendOtp(data: ResendOtpDto): Promise<{
    response: OTPResponse;
  }> {
    try {
      const response = await this.api.post<OTPResponse>(
        "/auth/resend-otp",
        data,
      );
      return { response: response.data };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<{
    response: OTPResponse;
  }> {
    try {
      const response = await this.api.post<OTPResponse>(
        "/auth/forgot-password",
        data,
      );
      return { response: response.data };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async resetPassword(data: ResetPasswordDto): Promise<{
    response: AuthResponse;
    encryptedUserInfo: string | null;
  }> {
    try {
      const response = await this.api.post<AuthResponse>(
        "/auth/reset-password",
        data,
      );

      let encryptedUserInfo: string | null = null;

      if (response.data.data.token && response.data.data.user) {
        const userInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: response.data.data.permissions,
          },
          response.data.data.token,
        );
        encryptedUserInfo = this.storeUserInfo(userInfo);
      }

      return {
        response: response.data,
        encryptedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  async updateProfile(data: UpdateProfileDto): Promise<{
    response: AuthResponse;
    updatedUserInfo?: UserInfo;
  }> {
    try {
      const formData = new FormData();

      // Append text fields if they exist
      const textFields: (keyof UpdateProfileDto)[] = [
        "gender",
        "country",
        "city_of_residence",
        "linkedin_profile",
        "institution",
        "city_of_institution",
        "program_of_study",
        "highest_education",
        "years_of_experience",
        "publication_link",
        "biography",
        "status",
        "organization_name",
        "city_of_organization",
        "job_title",
      ];

      textFields.forEach((field) => {
        if (data[field]) {
          formData.append(field, String(data[field]));
        }
      });

      if (data.profile_image) {
        formData.append("profile_image", data.profile_image);
      } else if (data.profile_image_url) {
        formData.append("profile_image_url", data.profile_image_url);
      }

      if (data.identity_file) {
        formData.append("identity_file", data.identity_file);
      } else if (data.identity_file_url) {
        formData.append("identity_file_url", data.identity_file_url);
      }

      if (data.resume) {
        formData.append("resume", data.resume);
      } else if (data.resume_url) {
        formData.append("resume_url", data.resume_url);
      }

      const response = await this.api.post<AuthResponse>(
        "/auth/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      let updatedUserInfo: UserInfo | undefined;
      const currentUser = this.getUserInfo();

      if (currentUser && response.data.data.user) {
        updatedUserInfo = this.convertToUserInfo(
          {
            ...response.data.data.user,
            permissions: currentUser.permissions, // Preserve existing permissions
          },
          currentUser.token,
        );
        this.storeUserInfo(updatedUserInfo);
      } else if (currentUser && response.data.data.profile) {
        updatedUserInfo = {
          ...currentUser,
          profile: response.data.data.profile,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        };
        this.storeUserInfo(updatedUserInfo);
      }

      return {
        response: response.data,
        updatedUserInfo,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  isAuthenticated(): boolean {
    return !!this.getUserInfo()?.token;
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expiration;
  }

  getTokenExpiration(): number | null {
    try {
      const userInfo = this.getUserInfo();
      if (!userInfo?.token) return null;
      const decoded = jwtDecode<{ exp: number }>(userInfo.token);
      return decoded.exp;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  getToken(): string | null {
    return this.getUserInfo()?.token || null;
  }

  logout(): void {
    this.clearAuth();
  }

  clearAuth(): void {
    clearUserInfo();
  }

  getUserRole(): string | null {
    return this.getUserInfo()?.role || null;
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === "ADMIN" || role === "EDITOR";
  }

  isMentor(): boolean {
    return this.getUserRole() === "MENTOR";
  }

  isMentee(): boolean {
    return this.getUserRole() === "MENTEE";
  }

  isUser(): boolean {
    return this.getUserRole() === "USER";
  }
}

export const authService = new AuthService();
