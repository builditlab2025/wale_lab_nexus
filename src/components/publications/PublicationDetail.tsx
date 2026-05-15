// src/components/publications/PublicationDetail.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Eye,
  Calendar,
  User,
  Tag,
  BookOpen,
  FileText,
  Lock,
  Unlock,
  Share2,
  Bookmark,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface PublicationDetailProps {
  publicationId?: string;
}

const PublicationDetail: React.FC<PublicationDetailProps> = ({
  publicationId,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [publication, setPublication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
    setHasAccess(auth); // Internal users have access

    // Fetch publication data
    const fetchPublication = async () => {
      // Simulate API call
      setTimeout(() => {
        setPublication({
          id: publicationId || "1",
          title: "Decentralized Governance Systems in Emerging Markets",
          authors: ["Dr. Adewale Ogunleye", "Prof. Sarah Johnson"],
          abstract:
            "This groundbreaking research explores the intersection of traditional governance structures and emerging decentralized technologies. The study analyzes case studies from Kenya, Nigeria, and India, revealing patterns of adoption and resistance.",
          content:
            "Full content would be displayed here for authorized users...",
          publicationDate: "2024-03-15",
          type: "journal",
          category: "Governance",
          tags: [
            "Decentralization",
            "Blockchain",
            "Governance",
            "Emerging Markets",
          ],
          downloads: 1243,
          views: 5240,
          citations: 47,
          isOpenAccess: true,
          doi: "10.1234/walelab.2024.001",
          references: [
            "Smith, J. (2023). Blockchain Governance. Oxford Press.",
            "Johnson, M. (2022). Decentralization in Africa. Cambridge Press.",
          ],
        });
        setLoading(false);
      }, 1000);
    };

    fetchPublication();
  }, [publicationId]);

  const handleCopyCitation = () => {
    const citation = `${publication?.authors.join(", ")} (${new Date(
      publication?.publicationDate,
    ).getFullYear()}). ${publication?.title}. Wale Lab Nexus. ${publication?.doi}`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    toast.success("Citation copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchase = () => {
    navigate("/subscription", { state: { publication: publication } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a708] mx-auto mb-4"></div>
          <p className="text-slate-500">Loading publication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#02250a] text-white">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#00a708]/20 text-[#00a708] px-3 py-1 rounded text-xs font-bold uppercase">
                  {publication.type}
                </span>
                {publication.isOpenAccess ? (
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs font-bold uppercase">
                    Open Access
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-xs font-bold uppercase">
                    Premium Content
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-brand">
                {publication.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {publication.authors.join(", ")}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(publication.publicationDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  DOI: {publication.doi}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-[#02250a] mb-4">
                  Abstract
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {publication.abstract}
                </p>
              </div>

              {/* Full Content - Conditional Access */}
              {hasAccess || publication.isOpenAccess ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-[#02250a] mb-4">
                    Full Content
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-slate-600 leading-relaxed">
                      {publication.content}
                    </p>
                    <h3>References</h3>
                    <ul>
                      {publication.references.map(
                        (ref: string, idx: number) => (
                          <li key={idx}>{ref}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button className="inline-flex items-center gap-2 bg-[#00a708] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#02250a] transition">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                  <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#02250a] mb-2">
                    Premium Content
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Full access to this publication requires a subscription or
                    one-time purchase.
                  </p>
                  <button
                    onClick={handlePurchase}
                    className="bg-[#00a708] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#02250a] transition"
                  >
                    Purchase Access
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-[#02250a] mb-4">Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Views</span>
                    <span className="font-bold text-[#02250a]">
                      {publication.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Downloads</span>
                    <span className="font-bold text-[#02250a]">
                      {publication.downloads.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Citations</span>
                    <span className="font-bold text-[#02250a]">
                      {publication.citations}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-[#02250a] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {publication.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-slate-100 px-3 py-1 rounded-full text-sm text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Citation Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-[#02250a] mb-4">Citation</h3>
                <div className="bg-slate-50 p-3 rounded-lg mb-3">
                  <code className="text-xs text-slate-600 break-all">
                    {publication.authors.join(", ")} (
                    {new Date(publication.publicationDate).getFullYear()}).
                    {publication.title}. Wale Lab Nexus. {publication.doi}
                  </code>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopyCitation}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Bookmark Card */}
              <button className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:border-[#00a708] transition flex items-center justify-center gap-2 text-slate-600 hover:text-[#00a708]">
                <Bookmark className="w-4 h-4" />
                Save to Library
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicationDetail;
