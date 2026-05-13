import React from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

interface HeroSectionProps {
  variant?: "home" | "auth";
  badge?: string;
  title?: string; // Made optional
  titleHighlight?: string;
  description?: string;
  showStats?: boolean;
  showPhilosophyCard?: boolean;
  customStats?: Array<{
    value: string;
    label: string;
    icon?: React.ElementType;
    color?: string;
  }>;
  children?: React.ReactNode;
  // Auth-specific props
  authIcon?: React.ElementType;
  authBadge?: string;
  authTitle?: string;
  authSubtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  variant = "home",
  badge = "Institutional Asset v2.4",
  title = "",
  titleHighlight,
  description = "",
  showStats = true,
  showPhilosophyCard = true,
  customStats,
  children,
  // Auth props
  authIcon: AuthIcon = LogIn,
  authBadge = "Welcome Back",
  authTitle = "Login to Your Account",
  authSubtitle = "Sign in to access your courses, research, and learning materials",
}) => {
  const defaultStats = [
    {
      value: "42",
      label: "Publications",
      color: "brand-green",
    },
    {
      value: "18",
      label: "Prototypes",
      color: "brand-orange",
    },
    { value: "120k+", label: "Lives Impacted", color: "white" },
  ];

  const stats = customStats || defaultStats;

  // Auth variant - lighter, centered hero section
  if (variant === "auth") {
    return (
      <section className="relative overflow-hidden pt-20 pb-16 bg-[#02250a]">
        {/* Logo Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a708]/10 via-transparent to-[#f8921e]/10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/20"
            >
              <AuthIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{authBadge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-brand"
            >
              {authTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/90 font-sans"
            >
              {authSubtitle}
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  // Home variant - full hero section with stats and philosophy card
  return (
    <header className="relative py-24 overflow-hidden bg-[#02250a] text-white">
      {/* Logo Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-[#00a708]/20 border border-[#00a708]/30 rounded text-[#00a708] text-xs font-bold uppercase tracking-widest mb-6">
              {badge}
            </div>
            <h2 className="font-serif italic text-5xl md:text-7xl mb-6 leading-tight text-white">
              {title}
              {titleHighlight && (
                <>
                  <br />
                  <span className="text-[#f8921e]">{titleHighlight}</span>
                </>
              )}
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light font-sans">
              {description}
            </p>

            {/* Stats Grid */}
            {showStats && (
              <div className="flex flex-wrap gap-4">
                {stats.map((stat, index) => {
                  const hoverColor =
                    stat.color === "brand-green"
                      ? "hover:border-[#00a708]/50"
                      : stat.color === "brand-orange"
                        ? "hover:border-[#f8921e]/50"
                        : "hover:border-white/50";
                  const textHoverColor =
                    stat.color === "brand-green"
                      ? "group-hover:text-[#00a708]"
                      : stat.color === "brand-orange"
                        ? "group-hover:text-[#f8921e]"
                        : "group-hover:text-white";

                  return (
                    <div
                      key={index}
                      className={`bg-white/5 border border-white/10 px-6 py-4 rounded ${hoverColor} transition cursor-default group flex-1 min-w-[120px]`}
                    >
                      <span
                        className={`block text-3xl font-bold ${textHoverColor} transition`}
                      >
                        {stat.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {children}
          </div>

          {/* Right Column - Philosophy Card (Desktop only) */}
          {showPhilosophyCard && (
            <div className="hidden lg:block relative">
              <div className="aspect-square bg-gradient-to-br from-[#00a708] to-[#f8921e] rounded-2xl rotate-3 opacity-20 absolute inset-0"></div>
              <div className="aspect-square bg-[#02250a] border border-white/10 rounded-2xl relative z-10 p-8 flex flex-col justify-center">
                <h4 className="text-[#f8921e] font-bold text-xs uppercase tracking-[0.4em] mb-4">
                  Core Philosophy
                </h4>
                <p className="font-serif italic text-3xl text-white">
                  "Bridging the gap between ivory tower research and real-world
                  impact through Manifold Wisdom."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
