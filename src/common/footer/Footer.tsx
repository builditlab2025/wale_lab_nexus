import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  FileBadge,
  Handshake,
  Upload,
  University,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";

interface ArchiveLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface ConnectLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const archiveLinks: ArchiveLink[] = [
    { name: "Journal (WJAI)", href: "/catalog?type=journal", icon: BookOpen },
    {
      name: "Technical Reports",
      href: "/catalog?type=technical",
      icon: FileText,
    },
    { name: "White Papers", href: "/catalog?type=whitepaper", icon: FileBadge },
  ];

  const connectLinks: ConnectLink[] = [
    { name: "Collaborate", href: "/submit-work", icon: Handshake },
    { name: "Submit Output", href: "/submit-work", icon: Upload },
    {
      name: "Wale University",
      href: "https://wale.university",
      icon: University,
    },
  ];

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-white border-t-8 border-[#02250a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column - Clickable */}
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 mb-6 cursor-pointer group focus:outline-none hover:opacity-80 transition"
              aria-label="Go to home"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Wale Lab Nexus Logo"
                  className="w-full min-h-30 object-contain"
                />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-extrabold text-[#02250a] tracking-tighter uppercase group-hover:text-[#00a708] transition">
                  Wale Lab Nexus
                </h2>
                <p className="text-[10px] text-[#f8921e] font-bold uppercase tracking-widest">
                  Manifold Wisdom
                </p>
              </div>
            </button>
            <p className="text-slate-500 text-sm max-w-sm mb-8 font-medium leading-relaxed">
              The public evidence layer where credibility, impact, and
              intellectual authority are proven.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/wale-university"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a708] hover:border-[#00a708] transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a708] hover:border-[#00a708] transition"
                aria-label="Twitter"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Archive Column */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#02250a] mb-6">
              Archive
            </h5>
            <ul className="space-y-4">
              {archiveLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-[#00a708] transition group cursor-pointer"
                    >
                      <Icon size={12} className="group-hover:text-[#00a708]" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#02250a] mb-6">
              Connect
            </h5>
            <ul className="space-y-4">
              {connectLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-[#00a708] transition group cursor-pointer"
                    >
                      <Icon size={12} className="group-hover:text-[#00a708]" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Wale University Lab Nexus. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/doi-policy");
              }}
              className="hover:text-[#02250a] transition cursor-pointer"
            >
              DOI Policy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/institutional-terms");
              }}
              className="hover:text-[#02250a] transition cursor-pointer"
            >
              Institutional Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
