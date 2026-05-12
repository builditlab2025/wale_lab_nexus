import React from "react";
import { TrendingUp, Microchip, Users } from "lucide-react";

function HeroSection() {
  const stats = [
    {
      value: "42",
      label: "Publications",
      icon: TrendingUp,
      color: "brand-green",
    },
    {
      value: "18",
      label: "Prototypes",
      icon: Microchip,
      color: "brand-orange",
    },
    { value: "120k+", label: "Lives Impacted", icon: Users, color: "white" },
  ];

  return (
    <header className="relative py-16 md:py-24 overflow-hidden bg-brand-dark text-white">
      {/* Logo Pattern Background */}
      <div className="absolute inset-0 logo-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-brand-green/20 border border-brand-green/30 rounded text-brand-green text-xs font-bold uppercase tracking-widest mb-6">
              Institutional Asset v2.4
            </div>
            <h2 className="serif text-4xl md:text-5xl lg:text-7xl mb-6 italic leading-tight">
              Credibility, Impact, & <br />
              <span className="text-brand-orange">Intellectual Authority.</span>
            </h2>
            <p className="text-base md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Wale Lab Nexus is our public evidence layer—a hybrid between a
              research journal, innovation showcase, and proof-of-work archive.
            </p>

            {/* Stats Grid */}
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 px-6 py-4 rounded hover:border-brand-green/50 transition cursor-default group flex-1 min-w-[120px]"
                >
                  <span className="block text-2xl md:text-3xl font-bold group-hover:text-brand-green transition">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Philosophy Card (Desktop only) */}
          <div className="hidden lg:block relative">
            <div className="aspect-square bg-gradient-to-br from-brand-green to-brand-orange rounded-2xl rotate-3 opacity-20 absolute inset-0"></div>
            <div className="aspect-square bg-brand-dark border border-white/10 rounded-2xl relative z-10 p-8 flex flex-col justify-center">
              <h4 className="text-brand-orange font-bold text-xs uppercase tracking-[0.4em] mb-4">
                Core Philosophy
              </h4>
              <p className="serif text-2xl lg:text-3xl italic">
                "Bridging the gap between ivory tower research and real-world
                impact through Manifold Wisdom."
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
