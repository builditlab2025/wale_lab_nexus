import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Compass,
  BookOpen,
  Rocket,
  BarChart3,
} from "lucide-react";
import logo from "../../assets/logo.png";

function ErrorBoundary() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Catalog", path: "/#catalog", icon: BookOpen },
    { name: "R2I Showcase", path: "/#r2i", icon: Rocket },
    { name: "Impact", path: "/#impact", icon: BarChart3 },
  ];

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found | Wale Lab Nexus</title>
      </Helmet>
      <div
        data-cy="error-boundary"
        className="fixed inset-0 overflow-y-auto bg-slate-50"
      >
        {/* Wale Lab Logo Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Brand gradient background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00a708]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-[#f8921e]/5 to-transparent"></div>

        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Wale Lab Brand Header - Clickable */}
            <div className="text-center mb-8">
              <button
                onClick={handleLogoClick}
                className="inline-flex items-center space-x-2 mb-4 cursor-pointer group hover:opacity-80 transition"
                aria-label="Go to home"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Wale Lab Nexus Logo"
                    className="w-full  h-30 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold tracking-tighter text-[#02250a] group-hover:text-[#00a708] transition">
                    WALE LAB <span className="text-[#00a708]">NEXUS</span>
                  </h1>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#f8921e] font-bold">
                    Public Evidence Layer
                  </p>
                </div>
              </button>
            </div>

            {/* Main content */}
            <div className="text-center space-y-8">
              {/* 404 Illustration */}
              <div className="relative inline-block">
                <h1 className="text-8xl md:text-9xl font-bold text-[#00a708]/10 font-brand">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-16 h-16 text-[#00a708]/30" />
                </div>
              </div>

              {/* Error message */}
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02250a] font-brand">
                  Page Not Found
                </h2>
                <p className="text-slate-500 max-w-md mx-auto font-sans">
                  The page you're looking for doesn't exist or has been moved to
                  a new location in our evidence layer.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition-all duration-200 gap-2 text-sm font-bold uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-[#00a708] text-white rounded-lg hover:bg-[#02250a] transition-all duration-200 gap-2 text-sm font-bold uppercase tracking-wider shadow-lg shadow-green-900/20"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>

              {/* Navigation links matching navbar */}
              <div className="pt-8">
                <p className="text-xs text-slate-400 mb-4 font-bold uppercase tracking-widest">
                  Explore the Nexus
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#00a708] transition-colors px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-[#00a708] font-bold uppercase tracking-wider"
                    >
                      <link.icon className="w-3 h-3" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-2xs text-slate-400 font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} Wale University Lab Nexus. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorBoundary;
