// src/components/publications/sections/PublicationGridSection.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Lock,
  Unlock,
} from "lucide-react";

interface PublicationGridSectionProps {
  searchQuery: string;
  selectedType: string;
  selectedCategory: string;
}

const PublicationGridSection: React.FC<PublicationGridSectionProps> = ({
  searchQuery,
  selectedType,
  selectedCategory,
}) => {
  const [publications] = useState([
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
      downloads: 1243,
      views: 5240,
      isOpenAccess: true,
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
      downloads: 892,
      views: 3420,
      isOpenAccess: false,
    },
  ]);

  const filteredPublications = publications.filter((pub) => {
    if (selectedType !== "all" && pub.type !== selectedType) return false;
    if (selectedCategory !== "all" && pub.category !== selectedCategory)
      return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some((a) => a.toLowerCase().includes(query)) ||
        pub.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "journal":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "journal":
        return "bg-purple-100 text-purple-700";
      case "article":
        return "bg-blue-100 text-blue-700";
      case "whitepaper":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {filteredPublications.map((pub) => (
              <Link
                key={pub.id}
                to={`/publication/${pub.id}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase ${getTypeColor(
                        pub.type,
                      )}`}
                    >
                      {getTypeIcon(pub.type)}
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
                        {pub.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {pub.downloads}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(pub.publicationDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationGridSection;
