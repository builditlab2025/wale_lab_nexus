// src/components/admin/AdminDashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  TrendingUp,
  DollarSign,
  UserPlus,
  Shield,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "publications" | "users" | "payments" | "analytics"
  >("overview");

  // Mock data
  const stats = [
    {
      label: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Total Publications",
      value: "1,234",
      change: "+8%",
      icon: FileText,
      color: "text-[#00a708]",
    },
    {
      label: "Total Revenue",
      value: "$45,678",
      change: "+23%",
      icon: DollarSign,
      color: "text-[#f8921e]",
    },
    {
      label: "Active Subscribers",
      value: "892",
      change: "+5%",
      icon: CreditCard,
      color: "text-purple-500",
    },
  ];

  const pendingReviews = [
    {
      id: "1",
      title: "Decentralized Governance Systems in Emerging Markets",
      author: "Dr. Adewale Ogunleye",
      submitted: "2024-03-15",
      status: "pending",
    },
    {
      id: "2",
      title: "AI Ethics Frameworks for African Contexts",
      author: "Dr. Chiamaka Nwosu",
      submitted: "2024-03-14",
      status: "reviewing",
    },
    {
      id: "3",
      title: "Renewable Energy Integration in Rural Communities",
      author: "Dr. James Mwangi",
      submitted: "2024-03-13",
      status: "pending",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "Dr. Adewale Ogunleye",
      email: "a.ogunleye@walelab.org",
      role: "Lecturer",
      status: "active",
      joined: "2024-01-15",
    },
    {
      id: "2",
      name: "Prof. Sarah Johnson",
      email: "s.johnson@walelab.org",
      role: "Researcher",
      status: "active",
      joined: "2024-01-20",
    },
    {
      id: "3",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "External",
      status: "pending",
      joined: "2024-03-10",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      user: "john.doe@example.com",
      amount: "$29.99",
      type: "Subscription",
      status: "completed",
      date: "2024-03-15",
    },
    {
      id: "TXN002",
      user: "jane.smith@example.com",
      amount: "$49.99",
      type: "Open Access Fee",
      status: "completed",
      date: "2024-03-14",
    },
    {
      id: "TXN003",
      user: "mike.brown@example.com",
      amount: "$9.99",
      type: "Single Purchase",
      status: "pending",
      date: "2024-03-14",
    },
  ];

  const handleApprove = (_: string) => {
    toast.success("Publication approved successfully");
  };

  const handleReject = (_: string) => {
    toast.error("Publication rejected");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <section className="relative py-8 bg-[#02250a] text-white">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-[#f8921e]" />
                <span className="text-sm font-bold uppercase tracking-wider text-[#f8921e]">
                  Admin Portal
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-brand">
                Administrator Dashboard
              </h1>
              <p className="text-slate-300 mt-1">
                Manage platform content, users, and analytics
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition">
                <Settings className="w-4 h-4" />
                Settings
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
                  <span
                    className={`text-xs font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
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
        <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto">
          {["overview", "publications", "users", "payments", "analytics"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-medium transition capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#00a708] border-b-2 border-[#00a708]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Pending Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#02250a]">
                  Pending Reviews
                </h2>
                <Link
                  to="/editorial"
                  className="text-sm text-[#00a708] hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 hover:bg-slate-50 transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-[#02250a] mb-2">
                          {review.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span>By {review.author}</span>
                          <span>
                            Submitted:{" "}
                            {new Date(review.submitted).toLocaleDateString()}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                              review.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {review.status === "pending" ? (
                              <Clock className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                            {review.status === "pending"
                              ? "Pending"
                              : "Under Review"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(review.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#02250a]">
                  Recent Registrations
                </h2>
                <button className="text-sm text-[#00a708] hover:underline">
                  Manage Users
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">
                              {user.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              user.role === "External"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs ${
                              user.status === "active"
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {user.status === "active" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(user.joined).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#00a708] hover:text-[#02250a]">
                            <UserPlus className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-[#02250a]">
                  Recent Transactions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-mono text-slate-600">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {transaction.user}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {transaction.type}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs ${
                              transaction.status === "completed"
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {transaction.status === "completed" ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Publications Tab */}
        {activeTab === "publications" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#02250a]">
                Manage Publications
              </h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search publications..."
                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none"
                  />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#02250a] mb-2">
                Publication Management
              </h3>
              <p className="text-slate-500">
                View and manage all platform publications
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-[#00a708] hover:text-[#02250a]">
                <Eye className="w-4 h-4" />
                View All Publications
              </button>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#02250a]">
                User Management
              </h2>
              <button className="bg-[#00a708] text-white px-4 py-2 rounded-lg hover:bg-[#02250a] transition">
                Add User
              </button>
            </div>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#02250a] mb-2">
                User Directory
              </h3>
              <p className="text-slate-500">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-[#02250a] mb-6">
              Payment Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-[#02250a]">$12,345</p>
                <TrendingUp className="w-4 h-4 text-green-500 mt-2" />
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500 mb-1">
                  Active Subscriptions
                </p>
                <p className="text-2xl font-bold text-[#02250a]">892</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500 mb-1">Open Access Fees</p>
                <p className="text-2xl font-bold text-[#02250a]">$8,234</p>
              </div>
            </div>
            <div className="text-center py-8">
              <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">
                View detailed transaction history and analytics
              </p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-[#02250a] mb-6">
              Platform Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#02250a]">
                    Publication Growth
                  </h3>
                  <BarChart3 className="w-5 h-5 text-[#00a708]" />
                </div>
                <p className="text-3xl font-bold text-[#02250a] mb-2">1,234</p>
                <p className="text-sm text-slate-500">Total publications</p>
                <p className="text-xs text-green-600 mt-2">+124 this month</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#02250a]">User Engagement</h3>
                  <Users className="w-5 h-5 text-[#f8921e]" />
                </div>
                <p className="text-3xl font-bold text-[#02250a] mb-2">45,678</p>
                <p className="text-sm text-slate-500">Total views</p>
                <p className="text-xs text-green-600 mt-2">+2,345 this month</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
