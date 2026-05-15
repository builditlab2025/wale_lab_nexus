import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  BookOpen,
  Rocket,
  BarChart3,
  LayoutDashboard,
  LogOut,
  Shield,
} from "lucide-react";
import logo from "../../assets/logo.png";
import { useAppContext } from "../../custom hooks/Hooks";

interface NavLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { isAuthenticated, signOut, getUserRole, getUserRoleName, isAdmin } =
    useAppContext();

  // navLinks with proper routes - names unchanged
  const navLinks: NavLink[] = [
    { name: "Catalog", path: "/catalog", icon: BookOpen },
    { name: "R2I Showcase", path: "/external-catalog", icon: Rocket },
    { name: "Impact", path: "/", icon: BarChart3 },
  ];

  const handleLogin = (): void => {
    navigate("/login");
  };

  const handleLogout = (): void => {
    signOut();
    navigate("/");
  };

  const handleSubmitWork = (): void => {
    navigate("/submit-work");
  };

  const handleDashboard = (): void => {
    const role = getUserRole();
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "editor") {
      navigate("/editorial");
    } else {
      navigate("/dashboard");
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    e.preventDefault();
    setIsSidebarOpen(false);

    if (link.name === "Impact" && window.location.pathname === "/") {
      // Scroll to Impact section on home page
      const element = document.querySelector("#impact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to the path
      navigate(link.path);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSidebarLogoClick = () => {
    handleLogoClick();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Top Branding Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Section - Clickable */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 cursor-pointer group focus:outline-none"
              aria-label="Go to home"
            >
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src={logo}
                  alt="Wale Lab Nexus Logo"
                  className="w-full min-h-30 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-extrabold tracking-tighter text-[#02250a]">
                  WALE LAB <span className="text-[#00a708]">NEXUS</span>
                </h1>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8921e] font-bold">
                  Manifold Wisdom
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-slate-600 hover:text-[#00a708] transition cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated() ? (
                <>
                  <button
                    onClick={handleDashboard}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded text-sm font-bold uppercase tracking-widest bg-[#02250a] text-white hover:bg-[#00a708] transition"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleSubmitWork}
                    className="bg-[#00a708] text-white px-6 py-2.5 rounded text-sm font-bold hover:bg-[#02250a] transition shadow-lg shadow-green-900/10 uppercase tracking-widest"
                  >
                    Submit Work
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded text-sm font-bold uppercase tracking-widest border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded text-sm font-bold uppercase tracking-widest border-2 border-[#00a708] text-[#00a708] hover:bg-[#00a708] hover:text-white transition"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={handleSubmitWork}
                    className="bg-[#00a708] text-white px-6 py-2.5 rounded text-sm font-bold hover:bg-[#02250a] transition shadow-lg shadow-green-900/10 uppercase tracking-widest"
                  >
                    Submit Work
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded text-slate-600 hover:bg-slate-100 transition"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <button
              onClick={handleSidebarLogoClick}
              className="flex items-center space-x-2 cursor-pointer group focus:outline-none hover:opacity-80 transition"
              aria-label="Go to home"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Wale Lab Nexus Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-[#02250a] group-hover:text-[#00a708] transition">
                Menu
              </span>
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded hover:bg-slate-100 transition"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info Section */}
          {isAuthenticated() && (
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#02250a] rounded-full flex items-center justify-center text-white">
                  <span className="font-bold text-lg">
                    {getUserRoleName()?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#02250a]">
                    {getUserRoleName() || "User"}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">
                    {getUserRole()?.toLowerCase() || "guest"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Navigation */}
          <div className="p-6 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition group cursor-pointer"
                >
                  <Icon
                    size={20}
                    className="text-slate-400 group-hover:text-[#00a708]"
                  />
                  <span className="font-bold text-slate-700 group-hover:text-[#00a708]">
                    {link.name}
                  </span>
                </a>
              );
            })}

            {/* Dashboard Link */}
            {isAuthenticated() && (
              <button
                onClick={() => {
                  handleDashboard();
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition group cursor-pointer"
              >
                <LayoutDashboard
                  size={20}
                  className="text-slate-400 group-hover:text-[#00a708]"
                />
                <span className="font-bold text-slate-700 group-hover:text-[#00a708]">
                  Dashboard
                </span>
              </button>
            )}

            {/* Admin Quick Link */}
            {isAdmin() && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition group cursor-pointer"
              >
                <Shield
                  size={20}
                  className="text-slate-400 group-hover:text-[#00a708]"
                />
                <span className="font-bold text-slate-700 group-hover:text-[#00a708]">
                  Admin Panel
                </span>
              </button>
            )}

            <div className="pt-4 border-t border-slate-200 space-y-3">
              {isAuthenticated() ? (
                <>
                  <button
                    onClick={() => {
                      handleSubmitWork();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full bg-[#00a708] text-white px-4 py-3 rounded text-sm font-bold hover:bg-[#02250a] transition uppercase tracking-widest"
                  >
                    Submit Work
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded border-2 border-red-500 text-red-500 font-bold uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded border-2 border-[#00a708] text-[#00a708] font-bold uppercase tracking-widest text-sm hover:bg-[#00a708] hover:text-white transition"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => {
                      handleSubmitWork();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full bg-[#00a708] text-white px-4 py-3 rounded text-sm font-bold hover:bg-[#02250a] transition uppercase tracking-widest"
                  >
                    Submit Work
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              © {new Date().getFullYear()} Wale Lab Nexus
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
