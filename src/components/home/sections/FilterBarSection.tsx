import React from "react";
import { Search } from "lucide-react";

interface FilterBarSectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

interface Filter {
  id: string;
  label: string;
}

const FilterBarSection: React.FC<FilterBarSectionProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const filters: Filter[] = [
    { id: "all", label: "All Output" },
    { id: "publication", label: "Publications" },
    { id: "project", label: "Prototypes" },
    { id: "impact", label: "Impact" },
  ];

  return (
    <section
      id="catalog"
      className="py-6 md:py-8 bg-white border-b border-slate-200 sticky top-20 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-btn px-4 md:px-5 py-2 rounded border border-slate-200 text-2xs font-extrabold uppercase tracking-widest transition ${
                  activeFilter === filter.id
                    ? "active bg-brand-green text-white border-brand-green"
                    : "hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-auto">
            <input
              type="text"
              placeholder="Search the Nexus..."
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded border border-slate-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition text-sm font-medium"
            />
            <Search
              size={14}
              className="absolute left-3 top-3 text-slate-400 group-focus-within:text-brand-green transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBarSection;
