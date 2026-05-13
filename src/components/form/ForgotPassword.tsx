import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { forgotPasswordSchema } from "../../schema/Index";
import HeroSection from "../../common/hero/HeroSection";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const navigate = useNavigate();

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual auth service
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSentEmail(values.email);
        setEmailSent(true);
        toast.success("Verification code sent! Please check your email.");

        // Navigate to reset password after a delay
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(values.email)}`);
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to send verification code";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Auth variant */}
      <HeroSection
        variant="auth"
        authIcon={KeyRound}
        authBadge="Reset Password"
        authTitle="Forgot Your Password?"
        authSubtitle="Enter your email address and we'll send you a verification code"
      />

      {/* Forgot Password Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
            >
              {emailSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#00a708]/10 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-[#00a708]" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#02250a] mb-2 font-brand">
                    Check Your Email
                  </h2>
                  <p className="text-slate-600 font-sans">
                    Verification code sent to{" "}
                    <span className="font-semibold text-[#02250a]">
                      {sentEmail}
                    </span>
                  </p>
                  <p className="text-sm text-slate-500 font-sans">
                    Redirecting to reset password page...
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00a708]"></div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00a708]/10 rounded-full mb-4">
                      <KeyRound className="w-8 h-8 text-[#00a708]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#02250a] mb-2 font-brand">
                      Reset Your Password
                    </h2>
                    <p className="text-slate-600 font-sans">
                      We'll send a verification code to your email
                    </p>
                  </div>

                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : "border-slate-200"
                          }`}
                          placeholder="researcher@walelab.org"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-sans">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#00a708] text-white py-3 px-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#02250a] transition-all duration-200 hover:shadow-lg hover:shadow-[#00a708]/25 disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Reset Code</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

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

            {/* Research Stats Banner */}
            <div className="mt-8 text-center">
              <p className="text-2xs text-slate-400 font-bold uppercase tracking-widest mb-2">
                Join a community of
              </p>
              <div className="flex justify-center gap-8">
                <div>
                  <span className="block text-xl font-bold text-[#00a708]">
                    42+
                  </span>
                  <span className="text-3xs text-slate-500">Publications</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#f8921e]">
                    18+
                  </span>
                  <span className="text-3xs text-slate-500">Prototypes</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#02250a]">
                    120k+
                  </span>
                  <span className="text-3xs text-slate-500">
                    Lives Impacted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
