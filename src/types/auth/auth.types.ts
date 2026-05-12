// src/types/auth/auth.types.ts - COMPLETE UPDATE

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

export interface RegisterAdminDto {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  role: "ADMIN";
}

export interface RegisterUserDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  accepted_terms: boolean;
}

// Updated to support BOTH file upload AND URL
export interface RegisterMenteeMentorDto {
  first_name: string;
  middle_names?: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: "MENTOR" | "MENTEE";
  program_id: string;
  research_item_id: string;
  form_data?: {
    research_interest?: string;
    uploaded_document_url?: string; // URL alternative for document
    [key: string]: unknown;
  };
  accepted_terms: boolean;
  file?: File; // Direct file upload (takes priority over URL)
}

// ============================================
// Permission Types
// ============================================

export interface ModulePermission {
  view?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  approve?: boolean;
  export?: boolean;
}

export type Permissions = Record<string, ModulePermission>;

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface ResendOtpDto {
  email: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

// Updated to support BOTH file uploads AND URLs
export interface UpdateProfileDto {
  // Text fields
  gender?: "male" | "female";
  country?: string;
  city_of_residence?: string;
  linkedin_profile?: string;
  institution?: string;
  city_of_institution?: string;
  program_of_study?: string;
  highest_education?: "phd" | "masters" | "bachelors";
  years_of_experience?: "1-4" | "5-9" | "10+";
  publication_link?: string;
  biography?: string;
  status?: "student" | "professional";
  organization_name?: string;
  city_of_organization?: string;
  job_title?: string;

  // Direct file uploads (takes priority over URLs)
  profile_image?: File;
  identity_file?: File;
  resume?: File;

  // URL alternatives (used if no file is provided for that field)
  profile_image_url?: string;
  identity_file_url?: string;
  resume_url?: string;
}

// ============================================
// Response Types
// ============================================

export interface Profile {
  id: string;
  user_id: string;
  profile_image?: string;
  email: string;
  date_of_birth?: string;
  phone_number?: string;
  gender?: string;
  status?: string;
  organization_name?: string;
  city_of_organization?: string;
  job_title?: string;
  country?: string;
  city_of_residence?: string;
  city_of_institution?: string;
  linkedin_profile?: string;
  address?: string;
  biography?: string;
  institution?: string;
  program_of_study?: string;
  years_of_experience?: string;
  highest_education?: string;
  portfolio_links?: string;
  publication_link?: string;
  identity_file?: string;
  resume?: string;
  created_at: string;
  updated_at: string;
}

export interface UserInfo {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role: string;
  role_name?: string | null;
  is_verified: boolean;
  profile?: Profile | null;
  profile_completed: boolean;
  token: string;
  created_at: string;
  updated_at: string;
  permissions?: Permissions;
}

export interface ApiUserData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role?: string;
  role_name?: string | null; // Add role_name
  is_verified?: boolean;
  profile?: Profile | null;
  profile_completed?: boolean;
  token?: string;
  created_at?: string;
  updated_at?: string;
  permissions?: Permissions;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user?: ApiUserData;
    token?: string;
    profile?: Profile;
    message?: string;
    permissions?: Permissions;
    file_info?: {
      url: string;
      source: "uploaded" | "external_url";
    };
  };
}

export interface OTPResponse {
  status: string;
  message: string;
  data: {
    otpSent?: boolean;
    emailSent?: boolean;
  };
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  response: {
    message: string;
    error: string;
    statusCode: number;
  };
  message?: string;
  errors?: ValidationError[];
  details?: unknown;
}

export interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiErrorResponse {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  response?: {
    message: string;
    error: string;
    statusCode: number;
  };
  message?: string;
  errors?: Array<{
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }>;
  details?: unknown;
}
