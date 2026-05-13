import { TrendingUp, Microchip, Users } from "lucide-react";

function HeroSection() {
  const stats = [
    {
      value: "0",
      label: "Publications",
      icon: TrendingUp,
      color: "brand-green",
    },
    {
      value: "0",
      label: "Prototypes",
      icon: Microchip,
      color: "brand-orange",
    },
    { value: "0", label: "Lives Impacted", icon: Users, color: "white" },
  ];

  return (
    <header className="relative py-24 overflow-hidden bg-[#02250a] text-white">
      {/* Logo Pattern Background - Fixed to match HTML exactly */}
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
              Institutional Asset v2.4
            </div>
            <h2 className="font-serif  text-5xl md:text-7xl mb-6 leading-tight text-white">
              Credibility, Impact, & <br />
              <span className="text-[#f8921e]">Intellectual Authority.</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light font-sans">
              Wale Lab Nexus is our public evidence layer—a hybrid between a
              research journal, innovation showcase, and proof-of-work archive.
            </p>

            {/* Stats Grid */}
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 px-6 py-4 rounded hover:border-[#00a708]/50 transition cursor-default group flex-1 min-w-[120px]"
                >
                  <span className="block text-3xl font-bold group-hover:text-[#00a708] transition">
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
            <div className="aspect-square bg-gradient-to-br from-[#00a708] to-[#f8921e] rounded-2xl rotate-3 opacity-20 absolute inset-0"></div>
            <div className="aspect-square bg-[#02250a] border border-white/10 rounded-2xl relative z-10 p-8 flex flex-col justify-center">
              <h4 className="text-[#f8921e] font-bold text-xs uppercase tracking-[0.4em] mb-4">
                Core Philosophy
              </h4>
              <p className="font-serif  text-3xl text-white">
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
