import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { resetPasswordSchema } from "../../schema/Index";
import HeroSection from "../../common/hero/HeroSection";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  pattern: RegExp;
  met: boolean;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(""));
  const navigate = useNavigate();

  // Get email from URL query params
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      toast.error("No email address provided");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Password requirements
  const passwordRequirements: PasswordRequirement[] = [
    {
      id: "length",
      label: "At least 8 characters",
      pattern: /^.{8,}$/,
      met: false,
    },
    {
      id: "number",
      label: "At least one number (0-9)",
      pattern: /[0-9]/,
      met: false,
    },
  ];

  const checkPasswordRequirements = (
    password: string,
  ): PasswordRequirement[] => {
    return passwordRequirements.map((req) => ({
      ...req,
      met: req.pattern.test(password),
    }));
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    setOtp(newOtpInputs.join(""));

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData && /^\d+$/.test(pastedData)) {
      const otpDigits = pastedData.slice(0, 6).split("");
      const newOtpInputs = [...otpInputs];
      for (let i = 0; i < otpDigits.length && i < 6; i++) {
        newOtpInputs[i] = otpDigits[i];
      }
      setOtpInputs(newOtpInputs);
      setOtp(newOtpInputs.join(""));

      const nextEmptyIndex = newOtpInputs.findIndex((v) => !v);
      if (nextEmptyIndex !== -1) {
        const input = document.getElementById(`otp-${nextEmptyIndex}`);
        input?.focus();
      }
    }
  };

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async () => {
      if (!email) {
        toast.error("No email address provided");
        navigate("/forgot-password");
        return;
      }

      if (!otp || otp.length !== 6) {
        toast.error("Please enter the 6-digit verification code");
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call - replace with actual auth service
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success(
          "Password reset successfully! Please login with your new password.",
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to reset password";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const currentPasswordRequirements = checkPasswordRequirements(
    formik.values.newPassword,
  );
  const allRequirementsMet = currentPasswordRequirements.every(
    (req) => req.met,
  );

  if (!email) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Auth variant */}
      <HeroSection
        variant="auth"
        authIcon={ShieldCheck}
        authBadge="Secure Reset"
        authTitle="Create New Password"
        authSubtitle={`Enter the verification code sent to ${email}`}
      />

      {/* Reset Password Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00a708]/10 rounded-full mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#00a708]" />
                </div>
                <h2 className="text-2xl font-bold text-[#02250a] mb-2 font-brand">
                  Reset Your Password
                </h2>
                <p className="text-slate-600 font-sans">
                  Enter the 6-digit verification code and your new password
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Verification Code
                  </label>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={otpInputs[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        disabled={isLoading}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-2 border-slate-200 rounded-lg focus:border-[#00a708] focus:ring-2 focus:ring-[#00a708]/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    ))}
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                        formik.touched.newPassword && formik.errors.newPassword
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Password must contain:
                    </h4>
                    <ul className="space-y-2">
                      {currentPasswordRequirements.map((req) => (
                        <li
                          key={req.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          {req.met ? (
                            <Check
                              size={14}
                              className="text-[#00a708] flex-shrink-0"
                            />
                          ) : (
                            <X
                              size={14}
                              className="text-slate-400 flex-shrink-0"
                            />
                          )}
                          <span
                            className={
                              req.met ? "text-[#00a708]" : "text-slate-500"
                            }
                          >
                            {req.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600 font-sans">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isLoading || !otp || otp.length !== 6 || !allRequirementsMet
                  }
                  className="w-full bg-[#00a708] text-white py-3 px-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#02250a] transition-all duration-200 hover:shadow-lg hover:shadow-[#00a708]/25 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a708] hover:text-[#02250a] transition font-sans"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
