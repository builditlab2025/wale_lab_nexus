// src/types/context/context.ts - Add permission types

import { ReactNode } from "react";
import { Permissions } from "../auth/auth.types";

// Profile interface to match backend response
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
  created_at: string;
  updated_at: string;
}

// UserInfo to match backend response structure with permissions
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

export interface ContextState {
  loading: boolean;
  error: string;
  userInfo: UserInfo | null;
  tokenExpiration: number | null;
  headerSearch: string;
}

export type ContextAction =
  | { type: "USER_SIGNIN"; payload: string }
  | { type: "USER_SIGNOUT" }
  | { type: "UPDATE_USER_INFO"; payload: UserInfo }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_HEADER_SEARCH"; payload: string };

export interface ContextProps {
  state: ContextState;
  dispatch: React.Dispatch<ContextAction>;
  check401AndLogout: (error: unknown) => void;
  signIn: (encryptedUserInfo: string) => void;
  signOut: () => void;
  updateUserInfo: (userInfo: UserInfo) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  setHeaderSearch: (search: string) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isMentor: () => boolean;
  isMentee: () => boolean;
  isUser: () => boolean;
  getUserRole: () => string | null;
  getUserRoleName: () => string | null;
  getUserPermissions: () => Permissions | null;
  hasPermission: (module: string, action: string) => boolean;
  canView: (module: string) => boolean;
  canCreate: (module: string) => boolean;
  canEdit: (module: string) => boolean;
  canDelete: (module: string) => boolean;
  canApprove: (module: string) => boolean;
  canExport: (module: string) => boolean;
}

export interface ContextProviderProps {
  children: ReactNode;
}
