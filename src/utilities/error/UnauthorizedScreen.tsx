// src/components/common/error/UnauthorizedScreen.tsx
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Shield, Lock } from "lucide-react";

function UnauthorizedScreen() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Unauthorized Access | Wale Lab</title>
      </Helmet>
      <div
        data-cy="unauthorized-screen"
        className="fixed inset-0 overflow-y-auto bg-white"
      >
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(#00B140_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Soft gradient background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-50/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-red-50/50 to-transparent"></div>

        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Main content */}
            <div className="text-center space-y-8">
              {/* 403 Illustration */}
              <div className="relative inline-block">
                <h1 className="text-8xl md:text-9xl font-bold text-red-500/10">
                  403
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-red-500/30" />
                </div>
              </div>

              {/* Error message */}
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  Access Denied
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  You don't have permission to access this page. Please contact
                  an administrator if you believe this is a mistake.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-200 gap-2 text-sm shadow-sm shadow-primary-500/20"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>

              {/* Helpful links based on authentication state */}
              <div className="pt-8">
                <p className="text-sm text-gray-400 mb-4">You might want to:</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 hover:text-primary-500 transition-colors px-3 py-1 bg-gray-50 rounded-full inline-flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3" />
                    Sign In
                  </Link>
                  <Link
                    to="/registration"
                    className="text-sm text-gray-500 hover:text-primary-500 transition-colors px-3 py-1 bg-gray-50 rounded-full"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/research"
                    className="text-sm text-gray-500 hover:text-primary-500 transition-colors px-3 py-1 bg-gray-50 rounded-full"
                  >
                    Research Area
                  </Link>
                  <Link
                    to="/mentors"
                    className="text-sm text-gray-500 hover:text-primary-500 transition-colors px-3 py-1 bg-gray-50 rounded-full"
                  >
                    Mentors
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Wale Lab. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnauthorizedScreen;
