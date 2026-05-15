// src/components/dashboard/UserDashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Download,
  Eye,
  Heart,
  LogOut,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "publications" | "downloads" | "saved"
  >("overview");

  const stats = [
    {
      label: "Total Publications",
      value: "12",
      icon: BookOpen,
      color: "text-[#00a708]",
    },
    {
      label: "Total Downloads",
      value: "47",
      icon: Download,
      color: "text-[#f8921e]",
    },
    { label: "Total Views", value: "2,345", icon: Eye, color: "text-blue-500" },
    { label: "Saved Items", value: "8", icon: Heart, color: "text-red-500" },
  ];

  const recentPublications = [
    {
      id: "1",
      title: "Decentralized Governance Systems in Emerging Markets",
      status: "Published",
      date: "2024-03-15",
      views: 5240,
      downloads: 1243,
    },
    {
      id: "2",
      title: "AI Ethics Frameworks for African Contexts",
      status: "Under Review",
      date: "2024-02-10",
      views: 0,
      downloads: 0,
    },
  ];

  const recentDownloads = [
    {
      id: "3",
      title: "Renewable Energy Integration in Rural Communities",
      author: "Dr. James Mwangi",
      date: "2024-03-20",
    },
    {
      id: "4",
      title: "Blockchain for Supply Chain Transparency",
      author: "Prof. Adaobi Okonkwo",
      date: "2024-03-18",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <section className="relative py-12 bg-[#02250a] text-white">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-brand">
                My Dashboard
              </h1>
              <p className="text-slate-300">
                Welcome back, Dr. Adewale Ogunleye
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 bg-[#00a708] text-white px-4 py-2 rounded-lg hover:bg-[#02250a] transition"
              >
                <PlusCircle className="w-4 h-4" />
                New Publication
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-[#02250a]">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200 mb-6">
          {["overview", "publications", "downloads", "saved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-medium transition capitalize ${
                activeTab === tab
                  ? "text-[#00a708] border-b-2 border-[#00a708]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Recent Publications */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-[#02250a]">
                  Recent Publications
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {recentPublications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-6 hover:bg-slate-50 transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#02250a] mb-2">
                          {pub.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(pub.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {pub.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {pub.downloads} downloads
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            pub.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {pub.status}
                        </span>
                        <Link
                          to={`/publication/${pub.id}`}
                          className="text-[#00a708] hover:text-[#02250a]"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Downloads */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-[#02250a]">
                  Recent Downloads
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {recentDownloads.map((download) => (
                  <div
                    key={download.id}
                    className="p-6 hover:bg-slate-50 transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[#02250a] mb-2">
                          {download.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          By {download.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(download.date).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/publication/${download.id}`}
                          className="text-[#00a708] hover:text-[#02250a]"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "publications" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#02250a] mb-2">
                Your Publications
              </h3>
              <p className="text-slate-500 mb-4">
                View and manage all your published works
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 text-[#00a708] hover:text-[#02250a]"
              >
                <PlusCircle className="w-4 h-4" />
                Upload New Publication
              </Link>
            </div>
          </div>
        )}

        {activeTab === "downloads" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#02250a] mb-2">
                Your Downloads
              </h3>
              <p className="text-slate-500">
                You haven't downloaded any publications yet
              </p>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#02250a] mb-2">
                Saved Items
              </h3>
              <p className="text-slate-500">Save publications to read later</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
