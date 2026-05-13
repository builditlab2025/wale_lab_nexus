import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import {
  FileText,
  Send,
  ArrowLeft,
  Upload,
  Tag,
  Users,
  Calendar,
  Building2,
  Link2,
  CheckCircle,
  AlertCircle,
  Microchip,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { submitWorkSchema } from "../../schema/Index";
import HeroSection from "../../common/hero/HeroSection";

interface SubmitWorkFormValues {
  title: string;
  type: string;
  category: string;
  description: string;
  authors: string;
  tags: string;
  fileUrl: string;
  institution: string;
  year: number;
  consent: boolean;
}

const SubmitWork: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const workTypes = [
    {
      value: "publication",
      label: "Publication",
      icon: FileText,
      color: "brand-green",
    },
    {
      value: "prototype",
      label: "Prototype",
      icon: Microchip,
      color: "brand-orange",
    },
    {
      value: "impact",
      label: "Impact Case Study",
      icon: TrendingUp,
      color: "brand-dark",
    },
  ];

  const categories = {
    publication: [
      "Economics",
      "Governance",
      "AI Ethics",
      "Cultural Studies",
      "Technology",
      "Education",
    ],
    prototype: [
      "Energy",
      "Healthcare",
      "Agriculture",
      "IoT",
      "Software",
      "Hardware",
    ],
    impact: [
      "Community Development",
      "Policy Change",
      "Economic Growth",
      "Environmental",
      "Social Impact",
    ],
  };

  const formik = useFormik<SubmitWorkFormValues>({
    initialValues: {
      title: "",
      type: "",
      category: "",
      description: "",
      authors: "",
      tags: "",
      fileUrl: "",
      institution: "",
      year: new Date().getFullYear(),
      consent: false,
    },
    validationSchema: submitWorkSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual submission service
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Submit Work Data:", values);
        toast.success(
          "Work submitted successfully! Our team will review it shortly.",
        );
        setIsSubmitted(true);

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Submission failed";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

//   const selectedWorkType = workTypes.find(
//     (type) => type.value === formik.values.type,
//   );
  const availableCategories = formik.values.type
    ? categories[formik.values.type as keyof typeof categories]
    : [];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection
          variant="auth"
          authIcon={CheckCircle}
          authBadge="Submission Received"
          authTitle="Thank You for Your Contribution"
          authSubtitle="Your work has been submitted to the Wale Lab Nexus for review."
        />
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-[#00a708]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-[#00a708]" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#02250a] mb-2 font-brand">
                  Submission Successful!
                </h2>
                <p className="text-slate-600 mb-6 font-sans">
                  Our team will review your submission and get back to you
                  within 5-7 business days.
                </p>
                <p className="text-sm text-slate-500 font-sans">
                  Redirecting to home page...
                </p>
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00a708]"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        variant="auth"
        authIcon={Upload}
        authBadge="Contribute to the Nexus"
        authTitle="Submit Your Work"
        authSubtitle="Share your research, prototypes, or impact case studies with the Wale Lab community"
      />

      {/* Submit Work Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8"
            >
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Work Type Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Work Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {workTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formik.values.type === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            formik.setFieldValue("type", type.value);
                            formik.setFieldValue("category", "");
                          }}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            isSelected
                              ? `border-[#00a708] bg-[#00a708]/5`
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <Icon
                            size={24}
                            className={
                              isSelected ? "text-[#00a708]" : "text-slate-400"
                            }
                          />
                          <span
                            className={`text-xs font-bold uppercase tracking-wider ${
                              isSelected ? "text-[#00a708]" : "text-slate-600"
                            }`}
                          >
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {formik.touched.type && formik.errors.type && (
                    <p className="mt-2 text-xs text-red-600 font-sans">
                      {formik.errors.type}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Work Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                      formik.touched.title && formik.errors.title
                        ? "border-red-500"
                        : "border-slate-200"
                    }`}
                    placeholder="Enter the title of your work"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.title}
                    </p>
                  )}
                </div>

                {/* Category */}
                {formik.values.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="category"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans bg-white ${
                        formik.touched.category && formik.errors.category
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <p className="mt-1 text-xs text-red-600 font-sans">
                        {formik.errors.category}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans resize-vertical ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-slate-200"
                    }`}
                    placeholder="Provide a detailed description of your work, methodology, and outcomes..."
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-400">
                    Minimum 50 characters. {formik.values.description.length}
                    /2000
                  </p>
                </div>

                {/* Authors */}
                <div>
                  <label
                    htmlFor="authors"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Author(s) *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="authors"
                      name="authors"
                      value={formik.values.authors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                        formik.touched.authors && formik.errors.authors
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="e.g., John Doe, Jane Smith (2024)"
                    />
                  </div>
                  {formik.touched.authors && formik.errors.authors && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.authors}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Tags *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans ${
                        formik.touched.tags && formik.errors.tags
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="e.g., AI, Blockchain, Education (comma separated)"
                    />
                  </div>
                  {formik.touched.tags && formik.errors.tags && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.tags}
                    </p>
                  )}
                </div>

                {/* Institution & Year Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="institution"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Institution
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formik.values.institution}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans"
                        placeholder="Your institution/organization"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="year"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        id="year"
                        name="year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans"
                        placeholder="2024"
                      />
                    </div>
                    {formik.touched.year && formik.errors.year && (
                      <p className="mt-1 text-xs text-red-600 font-sans">
                        {formik.errors.year}
                      </p>
                    )}
                  </div>
                </div>

                {/* File/Project URL */}
                <div>
                  <label
                    htmlFor="fileUrl"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Project URL / DOI
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      id="fileUrl"
                      name="fileUrl"
                      value={formik.values.fileUrl}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00a708]/20 focus:border-[#00a708] outline-none transition-all duration-200 font-sans"
                      placeholder="https://doi.org/... or project URL"
                    />
                  </div>
                  {formik.touched.fileUrl && formik.errors.fileUrl && (
                    <p className="mt-1 text-xs text-red-600 font-sans">
                      {formik.errors.fileUrl}
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-4 h-4 text-[#00a708] border-slate-300 rounded focus:ring-[#00a708]/20"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-slate-600 font-sans"
                  >
                    I confirm that this work is original and I have the rights
                    to submit it to the Wale Lab Nexus. I agree to the{" "}
                    <a href="/terms" className="text-[#00a708] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-[#00a708] hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
                {formik.touched.consent && formik.errors.consent && (
                  <p className="mt-1 text-xs text-red-600 font-sans">
                    {formik.errors.consent}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00a708] text-white py-3 px-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#02250a] transition-all duration-200 hover:shadow-lg hover:shadow-[#00a708]/25 disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit to Nexus</span>
                    </>
                  )}
                </button>
              </form>

              {/* Back to Home Link */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a708] hover:text-[#02250a] transition font-sans"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to Home
                </button>
              </div>
            </motion.div>

            {/* Info Banner */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <AlertCircle size={14} />
                <span>All submissions are reviewed by our editorial board</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitWork;
