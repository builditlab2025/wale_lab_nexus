// src/components/publications/sections/SearchFilterSection.tsx
import React from "react";
import { Search, X } from "lucide-react";

interface SearchFilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}) => {
  const publicationTypes = [
    { value: "all", label: "All Types" },
    { value: "journal", label: "Journals" },
    { value: "article", label: "Articles" },
    { value: "whitepaper", label: "Whitepapers" },
    { value: "technical", label: "Technical Reports" },
  ];

  const categories = [
    "All Categories",
    "Economics",
    "Governance",
    "AI Ethics",
    "Technology",
    "Education",
    "Healthcare",
    "Energy",
  ];

  return (
    <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none bg-white"
            >
              {publicationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none bg-white"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat === "All Categories" ? "all" : cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilterSection;
