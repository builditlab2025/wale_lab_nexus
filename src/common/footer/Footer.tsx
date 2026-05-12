import {
  BookOpen,
  FileText,
  FileBadge,
  Handshake,
  Upload,
  University,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
  const archiveLinks = [
    { name: "Journal (WJAI)", href: "#", icon: BookOpen },
    { name: "Technical Reports", href: "#", icon: FileText },
    { name: "White Papers", href: "#", icon: FileBadge },
  ];

  const connectLinks = [
    { name: "Collaborate", href: "#", icon: Handshake },
    { name: "Submit Output", href: "#", icon: Upload },
    { name: "Wale University", href: "#", icon: University },
  ];

  return (
    <footer className="bg-white border-t-8 border-[#02250a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#02250a] rounded flex items-center justify-center text-white font-bold">
                W
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#02250a] tracking-tighter uppercase">
                  Wale Lab Nexus
                </h2>
                <p className="text-[10px] text-[#f8921e] font-bold uppercase tracking-widest">
                  Manifold Wisdom
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-sm max-w-sm mb-8 font-medium leading-relaxed">
              The public evidence layer where credibility, impact, and
              intellectual authority are proven.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a708] hover:border-[#00a708] transition"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a708] hover:border-[#00a708] transition"
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
                      className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-[#00a708] transition group"
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
                      className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-[#00a708] transition group"
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
          <p>&copy; 2024 Wale University Lab Nexus. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#02250a] transition">
              DOI Policy
            </a>
            <a href="#" className="hover:text-[#02250a] transition">
              Institutional Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
