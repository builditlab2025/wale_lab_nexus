// src/components/external/ExternalCatalog.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Eye,
  Calendar,
  User,
  Lock,
  Unlock,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

const ExternalCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  //   const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  const publications = [
    {
      id: "1",
      title: "Decentralized Governance Systems in Emerging Markets",
      authors: ["Dr. Adewale Ogunleye", "Prof. Sarah Johnson"],
      abstract:
        "Analyzing the friction between traditional hierarchical oversight and community-led algorithmic protocols...",
      publicationDate: "2024-03-15",
      type: "journal",
      category: "Governance",
      tags: ["Decentralization", "Blockchain"],
      views: 5240,
      isOpenAccess: true,
      price: null,
    },
    {
      id: "2",
      title: "AI Ethics Frameworks for African Contexts",
      authors: ["Dr. Chiamaka Nwosu", "Prof. Michael Okafor"],
      abstract:
        "Developing culturally-aware ethical guidelines for artificial intelligence deployment...",
      publicationDate: "2024-02-10",
      type: "article",
      category: "AI Ethics",
      tags: ["Artificial Intelligence", "Ethics"],
      views: 3420,
      isOpenAccess: false,
      price: 29.99,
    },
    {
      id: "3",
      title: "Renewable Energy Integration in Rural Communities",
      authors: ["Dr. James Mwangi", "Eng. Lisa Chen"],
      abstract:
        "Technical framework for implementing solar microgrids in off-grid communities...",
      publicationDate: "2024-01-20",
      type: "technical",
      category: "Energy",
      tags: ["Renewable Energy", "Solar"],
      views: 8900,
      isOpenAccess: true,
      price: null,
    },
    {
      id: "4",
      title: "Blockchain for Supply Chain Transparency",
      authors: ["Prof. Adaobi Okonkwo"],
      abstract:
        "Exploring blockchain applications in supply chain management for African markets...",
      publicationDate: "2024-03-01",
      type: "whitepaper",
      category: "Technology",
      tags: ["Blockchain", "Supply Chain"],
      views: 2100,
      isOpenAccess: false,
      price: 49.99,
    },
  ];

  const filteredPublications = publications
    .filter((pub) => {
      if (selectedType !== "all" && pub.type !== selectedType) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          pub.title.toLowerCase().includes(term) ||
          pub.authors.some((a) => a.toLowerCase().includes(term)) ||
          pub.tags.some((t) => t.toLowerCase().includes(term))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime()
        );
      } else if (sortBy === "views") {
        return b.views - a.views;
      }
      return 0;
    });

  const handlePurchase = (publication: any) => {
    // Redirect to payment
    window.location.href = `/subscription?publication=${publication.id}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#02250a] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-brand">
            Research <span className="text-[#f8921e]">Catalog</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover cutting-edge research, journals, and technical reports from
            Wale University scholars
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a708]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedType === "all"
                  ? "bg-[#00a708] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType("journal")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedType === "journal"
                  ? "bg-[#00a708] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Journals
            </button>
            <button
              onClick={() => setSelectedType("article")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedType === "article"
                  ? "bg-[#00a708] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setSelectedType("technical")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedType === "technical"
                  ? "bg-[#00a708] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              Technical Reports
            </button>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none"
            >
              <option value="date">Newest First</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-[#02250a] mb-2">
              No publications found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase">
                      {pub.type}
                    </span>
                    {pub.isOpenAccess ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        <Unlock className="w-3 h-3" />
                        Open Access
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        <Lock className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#02250a] mb-3 group-hover:text-[#00a708] transition line-clamp-2">
                    {pub.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {pub.abstract}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <User className="w-3 h-3" />
                    <span>{pub.authors[0]}</span>
                    {pub.authors.length > 1 && (
                      <span>+{pub.authors.length - 1}</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-2xs bg-slate-100 px-2 py-1 rounded text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {pub.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(pub.publicationDate).getFullYear()}
                      </span>
                    </div>

                    {!pub.isOpenAccess && (
                      <button
                        onClick={() => handlePurchase(pub)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#00a708] hover:text-[#02250a] transition"
                      >
                        ${pub.price}
                        <ShoppingCart className="w-3 h-3" />
                      </button>
                    )}

                    {pub.isOpenAccess && (
                      <Link
                        to={`/publication/${pub.id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#00a708] hover:text-[#02250a] transition"
                      >
                        Read More
                        <ChevronDown className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalCatalog;
