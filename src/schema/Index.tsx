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

// Submit Work schema
export const submitWorkSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters"),
  type: yup
    .string()
    .oneOf(
      ["publication", "prototype", "impact"],
      "Please select a valid work type",
    )
    .required("Work type is required"),
  category: yup.string().required("Category is required"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "word-count",
      "Description must be at least 200 words (current: ${wordCount} words)",
      function (value) {
        if (!value) return false;
        // Strip HTML tags and count words
        const plainText = value.replace(/<[^>]*>/g, "");
        const words = plainText
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        const wordCount = words.length;
        // Store word count for error message
        (this.parent as any).descriptionWordCount = wordCount;
        return wordCount >= 200;
      },
    ),
  authors: yup.string().required("Author(s) is required"),
  tags: yup.string().required("At least one tag is required"),
  fileUrl: yup.string().url("Please enter a valid URL"),
  institution: yup.string(),
  year: yup
    .number()
    .min(1900, "Year must be 1900 or later")
    .max(
      new Date().getFullYear(),
      `Year must be ${new Date().getFullYear()} or earlier`,
    ),
  consent: yup.boolean().oneOf([true], "You must agree to the terms to submit"),
});
