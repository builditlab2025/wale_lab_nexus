import React from "react";

const JournalAnnouncementSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-dark to-[#011a07] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Wale Lab Journal of Applied Innovation
            </h2>
            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed font-light">
              Our bi-annual peer-reviewed publication featuring the world's most
              rigorous research on community-led innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-brand-green hover:bg-[#008f07] text-white px-6 md:px-8 py-3 rounded font-bold transition uppercase tracking-widest text-xs shadow-lg shadow-green-900/40">
                Current Issue
              </button>
              <button className="border border-white/20 hover:bg-white/5 text-white px-6 md:px-8 py-3 rounded font-bold transition uppercase tracking-widest text-xs">
                Call for Papers
              </button>
            </div>
          </div>

          {/* Journal Cover Mockup */}
          <div className="w-full sm:w-80 lg:w-64 aspect-[3/4] bg-brand-dark border border-white/10 rounded-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <span className="text-2xs font-bold tracking-[0.3em] uppercase text-brand-orange mb-2">
                Volume 04 • Issue 02
              </span>
              <h4 className="font-bold text-base md:text-lg mb-4 leading-tight brand-font uppercase">
                Special Edition: Decentralized Resilience
              </h4>
              <div className="h-1 w-12 bg-brand-green"></div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1532187875605-2fe358511423?auto=format&fit=crop&q=80&w=800"
              alt="Journal Cover"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalAnnouncementSection;
