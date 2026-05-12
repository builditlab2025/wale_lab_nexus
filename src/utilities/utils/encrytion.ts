// src/utilities/utils/encrytion.ts
import CryptoJS from "crypto-js";
import { UserInfo } from "../../types/auth/auth.types";

const ENCRYPTION_KEY =
  import.meta.env.VITE_ENCRYPTION_SECRET_KEY || "default-secret-key";

// Type guard to check if decrypted data is UserInfo
export const isUserInfo = (data: unknown): data is UserInfo => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "email" in data &&
    "token" in data &&
    "role" in data
  );
};

// Encrypt data
export const encryptData = (data: unknown): string => {
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, ENCRYPTION_KEY).toString();
};

// Decrypt data - specifically for UserInfo
export const decryptData = (encryptedData: string): UserInfo | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return null;
    }

    const parsedData = JSON.parse(decrypted);

    if (isUserInfo(parsedData)) {
      return parsedData;
    }

    return null;
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    return null;
  }
};

// Store user info in sessionStorage (cleared when browser/tab closes)
export const storeUserInfo = (userInfo: UserInfo): string => {
  const encryptedData = encryptData(userInfo);
  sessionStorage.setItem("u_u", encryptedData);
  return encryptedData;
};

// Get decrypted user info from sessionStorage
export const getDecryptedUserInfo = (): UserInfo | null => {
  const encryptedData = sessionStorage.getItem("u_u");
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};

// Clear user info from sessionStorage
export const clearUserInfo = (): void => {
  sessionStorage.removeItem("u_u");
};

// Check if user info exists in sessionStorage
export const hasUserInfo = (): boolean => {
  return sessionStorage.getItem("u_u") !== null;
};
