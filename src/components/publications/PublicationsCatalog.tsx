// src/components/publications/PublicationsCatalog.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import SearchFilterSection from "./sections/SearchFilterSection";
import PublicationGridSection from "./sections/PublicationGridSection";

const PublicationsCatalog: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <SearchFilterSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PublicationGridSection
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default PublicationsCatalog;
