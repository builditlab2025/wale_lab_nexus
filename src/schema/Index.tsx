//src/schema/index.tsx
import * as yup from "yup";

//Login form schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Forgot Password schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// Reset Password schema
export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
