import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loginSchema } from "../../schema/Index";
import HeroSection from "../../common/hero/HeroSection";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual auth service
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Store user info in localStorage (example)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", values.email);

        toast.success("Login successful! Redirecting...");

        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Auth variant - light and centered */}
      <HeroSection
        variant="auth"
        authIcon={LogIn}
        authBadge="Secure Access"
        authTitle="Welcome Back to Wale Lab Nexus"
        authSubtitle="Sign in to access your dashboard, research materials, and collaborative tools."
      />

      {/* Login Form Section */}
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
                  <LogIn className="w-8 h-8 text-[#00a708]" />
                </div>
                <h2 className="text-2xl font-bold text-[#02250a] mb-2 font-brand">
                  Access Your Account
                </h2>
                <p className="text-slate-600 font-sans">
                  Enter your credentials to continue your research journey
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

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold uppercase tracking-wider text-[#00a708] hover:text-[#02250a] transition font-sans"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00a708] text-white py-3 px-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#02250a] transition-all duration-200 hover:shadow-lg hover:shadow-[#00a708]/25 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </button>
              </form>

              {/* Sign Up Options */}
              <div className="mt-6 space-y-4">
                {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-slate-500 font-sans">
                      New to the Nexus?
                    </span>
                  </div>
                </div> */}

                <p className="text-center text-xs text-slate-500 font-sans">
                  By signing in, you agree to our{" "}
                  <Link to="/terms" className="text-[#00a708] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#00a708] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
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
                    0
                  </span>
                  <span className="text-3xs text-slate-500">Publications</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#f8921e]">
                    0
                  </span>
                  <span className="text-3xs text-slate-500">Prototypes</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#02250a]">
                    0
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

export default Login;
