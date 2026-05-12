// src/components/home/Home.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import FilterBarSection from "./sections/FilterBarSection";
import ContentGridSection from "./sections/ContentGridSection";
import R2IJourneySection from "./sections/R2IJourneySection";
import JournalAnnouncementSection from "./sections/JournalAnnouncementSection";

const Home: React.FC = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Handle hash links for auto-scrolling to specific section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <HeroSection />
      <FilterBarSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ContentGridSection activeFilter={activeFilter} />
      <R2IJourneySection />
      <JournalAnnouncementSection />
    </div>
  );
};

export default Home;
