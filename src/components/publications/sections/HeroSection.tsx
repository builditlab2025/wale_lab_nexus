// src/components/publications/sections/HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#02250a] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-brand">
          Publications <span className="text-[#f8921e]">Catalog</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Discover cutting-edge research, journals, and technical reports from
          Wale University scholars
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
