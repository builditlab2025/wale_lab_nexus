// src/types/file/file.types.ts

export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  user_id: string;
  s3_key: string;
  created_at: string;
}

export interface UserFile {
  id: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  user_id: string;
  s3_key: string;
  created_at: string;
}

export interface FileListResponse {
  data: UserFile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FileDeleteResponse {
  message: string;
}

export interface PresignedViewUrlResponse {
  url: string;
  expires_in: number;
}
