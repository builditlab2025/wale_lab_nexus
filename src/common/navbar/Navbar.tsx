import React, { useState } from "react";
import { Menu, X, LogIn, BookOpen, Rocket, BarChart3 } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { name: "Catalog", href: "#catalog", icon: BookOpen },
    { name: "R2I Showcase", href: "#r2i", icon: Rocket },
    { name: "Impact", href: "#impact", icon: BarChart3 },
  ];

  const handleLogin = (): void => {
    console.log("Login clicked");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Top Branding Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-[#02250a] rounded flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00a708] to-transparent opacity-50"></div>
                <span className="relative font-extrabold text-2xl">W</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tighter text-[#02250a]">
                  WALE LAB <span className="text-[#00a708]">NEXUS</span>
                </h1>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8921e] font-bold">
                  Manifold Wisdom
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-[#00a708] transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2.5 rounded text-sm font-bold uppercase tracking-widest border-2 border-[#00a708] text-[#00a708] hover:bg-[#00a708] hover:text-white transition"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button className="bg-[#00a708] text-white px-6 py-2.5 rounded text-sm font-bold hover:bg-[#02250a] transition shadow-lg shadow-green-900/10 uppercase tracking-widest">
                Submit Work
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded text-slate-600 hover:bg-slate-100 transition"
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
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#02250a] rounded flex items-center justify-center text-white">
                <span className="font-extrabold text-lg">W</span>
              </div>
              <span className="font-extrabold text-[#02250a]">Menu</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="p-6 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition group"
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

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded border-2 border-[#00a708] text-[#00a708] font-bold uppercase tracking-widest text-sm hover:bg-[#00a708] hover:text-white transition"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button className="w-full bg-[#00a708] text-white px-4 py-3 rounded text-sm font-bold hover:bg-[#02250a] transition uppercase tracking-widest">
                Submit Work
              </button>
            </div>
          </div>

          {/* Sidebar Footer Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              © 2024 Wale Lab Nexus
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
