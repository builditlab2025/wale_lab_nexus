// src/context/AppContext.tsx - Add permission helpers

import { useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import {
  ContextAction,
  ContextProps,
  ContextState,
  ContextProviderProps,
  UserInfo,
} from "../types/context/context";
import { Context } from "../types/context/appcontext";
import {
  decryptData,
  encryptData,
  getDecryptedUserInfo,
} from "../utilities/utils/encrytion";
import { authService } from "../services/authService";
import { ApiErrorResponse, Permissions } from "../types/auth/auth.types";

// Helper function to get initial user info from sessionStorage
const getInitialUserInfo = (): UserInfo | null => {
  return getDecryptedUserInfo();
};

// Helper function to get initial token expiration
const getInitialTokenExpiration = (): number | null => {
  try {
    const userInfo = getInitialUserInfo();
    if (!userInfo?.token) return null;

    const decoded = jwtDecode<{ exp: number }>(userInfo.token);
    return decoded.exp;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// INITIAL STATE
const initialState: ContextState = {
  loading: true,
  error: "",
  userInfo: getInitialUserInfo(),
  tokenExpiration: getInitialTokenExpiration(),
  headerSearch: "",
};

function reducer(state: ContextState, action: ContextAction): ContextState {
  switch (action.type) {
    case "USER_SIGNIN": {
      try {
        const decryptedUserInfo = decryptData(action.payload);
        if (!decryptedUserInfo) {
          console.error("Failed to decrypt user info during signin");
          return {
            ...state,
            loading: false,
            error: "Failed to process user information",
          };
        }

        sessionStorage.setItem("u_u", action.payload);

        const tokenExpiration = jwtDecode<{ exp: number }>(
          decryptedUserInfo.token,
        ).exp;

        return {
          ...state,
          userInfo: decryptedUserInfo,
          tokenExpiration,
          loading: false,
          error: "",
        };
      } catch (error) {
        console.error("Error processing encrypted user info:", error);
        return {
          ...state,
          loading: false,
          error: "Failed to process user information",
        };
      }
    }

    case "UPDATE_USER_INFO": {
      const encryptedData = encryptData(action.payload);
      sessionStorage.setItem("u_u", encryptedData);

      const tokenExpiration = jwtDecode<{ exp: number }>(
        action.payload.token,
      ).exp;

      return {
        ...state,
        userInfo: action.payload,
        tokenExpiration,
        loading: false,
        error: "",
      };
    }

    case "USER_SIGNOUT":
      authService.logout();
      return {
        ...state,
        userInfo: null,
        tokenExpiration: null,
        headerSearch: "",
        loading: false,
        error: "",
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };

    case "SET_HEADER_SEARCH":
      return {
        ...state,
        headerSearch: action.payload,
      };

    default:
      return state;
  }
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  let sessionExpiredToastShown = false;

  const handleSessionExpired = (customMessage?: string) => {
    const message =
      customMessage || "Your session has expired. Please login again.";

    dispatch({ type: "USER_SIGNOUT" });

    if (!sessionExpiredToastShown) {
      sessionExpiredToastShown = true;
      toast.error(message, {
        duration: 5000,
        id: "session-expired",
      });

      setTimeout(() => {
        sessionExpiredToastShown = false;
      }, 1000);
    }

    if (!window.location.pathname.includes("/login")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    authService.registerSessionExpiredCallback(() => {
      handleSessionExpired("Your session has expired. Please login again.");
    });
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (state.tokenExpiration) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = state.tokenExpiration - currentTime;

        if (currentTime >= state.tokenExpiration) {
          handleSessionExpired("Your session has expired. Please login again.");
        } else if (timeUntilExpiry <= 300 && timeUntilExpiry > 0) {
          const minutesLeft = Math.floor(timeUntilExpiry / 60);

          if (timeUntilExpiry <= 300 && timeUntilExpiry > 295) {
            toast.warning(
              `Your session will expire in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}`,
              {
                duration: 8000,
                id: "session-warning",
              },
            );
          }

          console.warn(`Token will expire in ${minutesLeft} minutes`);
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 30000);
    return () => clearInterval(interval);
  }, [state.tokenExpiration]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiErrorResponse>) => {
        const originalRequest = error.config as {
          _retry?: boolean;
          url?: string;
        };

        const isAuthEndpoint =
          originalRequest.url?.includes("/auth/verify-email") ||
          originalRequest.url?.includes("/auth/login") ||
          originalRequest.url?.includes("/auth/register");

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 && !isAuthEndpoint) {
            if (!originalRequest._retry) {
              originalRequest._retry = true;

              const errorData = error.response?.data;
              let errorMessage =
                "Your session has expired. Please login again.";

              if (errorData?.message) {
                errorMessage = errorData.message;
              } else if (errorData?.response?.message) {
                errorMessage = errorData.response.message;
              }

              if (
                errorMessage.toLowerCase().includes("session") ||
                errorMessage.toLowerCase().includes("expired")
              ) {
                handleSessionExpired(errorMessage);
              } else {
                toast.error(errorMessage, {
                  duration: 4000,
                });
                return Promise.reject(error);
              }
            }
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  useEffect(() => {
    if (state.loading) {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const check401AndLogout = (error: unknown) => {
    if (
      axios.isAxiosError<ApiErrorResponse>(error) &&
      error.response?.status === 401
    ) {
      const errorData = error.response?.data;
      let errorMessage = "Session expired. Please login again.";

      if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.response?.message) {
        errorMessage = errorData.response.message;
      }

      handleSessionExpired(errorMessage);
    }
  };

  const signIn = (encryptedUserInfo: string) => {
    dispatch({ type: "USER_SIGNIN", payload: encryptedUserInfo });
    toast.success("Welcome back! You've successfully logged in.", {
      duration: 3000,
    });
  };

  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
    toast.success("You've successfully logged out", {
      duration: 3000,
    });
    window.location.href = "/login";
  };

  const updateUserInfo = (userInfo: UserInfo) => {
    dispatch({ type: "UPDATE_USER_INFO", payload: userInfo });
    toast.success("Profile updated successfully", {
      duration: 3000,
    });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string) => {
    dispatch({ type: "SET_ERROR", payload: error });
    if (error) {
      toast.error(error, {
        duration: 4000,
      });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const setHeaderSearch = (search: string) => {
    dispatch({ type: "SET_HEADER_SEARCH", payload: search });
  };

  // Authentication helper methods
  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated() && !authService.isTokenExpired();
  };

  const isAdmin = (): boolean => {
    const role = state.userInfo?.role;
    return role === "ADMIN" || role === "EDITOR" || role === "INSTRUCTOR";
  };

  const isMentor = (): boolean => {
    return state.userInfo?.role === "MENTOR";
  };

  const isMentee = (): boolean => {
    return state.userInfo?.role === "MENTEE";
  };

  const isUser = (): boolean => {
    return state.userInfo?.role === "USER";
  };

  const getUserRole = (): string | null => {
    return state.userInfo?.role || null;
  };

  const getUserRoleName = (): string | null => {
    return state.userInfo?.role_name || null;
  };

  // NEW: Permission helper methods
  const getUserPermissions = (): Permissions | null => {
    return state.userInfo?.permissions || null;
  };

  const hasPermission = (module: string, action: string): boolean => {
    const permissions = getUserPermissions();
    if (!permissions) return false;

    const modulePerms = permissions[module];
    if (!modulePerms) return false;

    return modulePerms[action as keyof typeof modulePerms] === true;
  };

  const canView = (module: string): boolean => hasPermission(module, "view");
  const canCreate = (module: string): boolean =>
    hasPermission(module, "create");
  const canEdit = (module: string): boolean => hasPermission(module, "edit");
  const canDelete = (module: string): boolean =>
    hasPermission(module, "delete");
  const canApprove = (module: string): boolean =>
    hasPermission(module, "approve");
  const canExport = (module: string): boolean =>
    hasPermission(module, "export");

  const value: ContextProps = {
    state,
    dispatch,
    check401AndLogout,
    signIn,
    signOut,
    updateUserInfo,
    setLoading,
    setError,
    clearError,
    setHeaderSearch,
    isAuthenticated,
    isAdmin,
    isMentor,
    isMentee,
    isUser,
    getUserRole,
    getUserRoleName,
    getUserPermissions,
    hasPermission,
    canView,
    canCreate,
    canEdit,
    canDelete,
    canApprove,
    canExport,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
