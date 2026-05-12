import React, { useState } from "react";
import { FileText, Microchip, ExternalLink, Quote } from "lucide-react";

interface Publication {
  id: string;
  type: "publication";
  badge: string;
  ref: string;
  title: string;
  description: string;
  authors: string;
  tags: string[];
  citation: string;
}

interface Project {
  type: "project";
  image: string;
  stage: string;
  title: string;
  description: string;
  tags: string[];
}

interface Impact {
  type: "impact";
  quote: string;
  author: string;
  metrics: Array<{ label: string; value: string }>;
}

type ContentItem = Publication | Project | Impact;

interface ContentGridSectionProps {
  activeFilter: string;
}

const ContentGridSection: React.FC<ContentGridSectionProps> = ({
  activeFilter,
}) => {
  const [activeCitation, setActiveCitation] = useState<string | null>(null);

  const publications: Publication[] = [
    {
      id: "cite-1",
      type: "publication",
      badge: "Peer Reviewed",
      ref: "WL-NEX-2024-04",
      title: "Decentralized Governance Systems in Emerging Markets",
      description:
        "Analyzing the friction between traditional hierarchical oversight and community-led algorithmic protocols.",
      authors: "Wale, A. & Mensah, K. (2024)",
      tags: ["ECONOMICS", "GOVERNANCE"],
      citation:
        "Wale Lab (2024). Decentralized Governance Systems. WLJAI, Vol. 1. DOI: 10.WL/NEX.2024.04",
    },
    {
      id: "cite-2",
      type: "publication",
      badge: "Peer Reviewed",
      ref: "WL-NEX-2024-07",
      title: "AI Ethics Frameworks for African Contexts",
      description:
        "Developing culturally-aware ethical guidelines for artificial intelligence deployment in diverse communities.",
      authors: "Okafor, C. & Ndlovu, T. (2024)",
      tags: ["AI ETHICS", "CULTURAL STUDIES"],
      citation:
        "Wale Lab (2024). AI Ethics Frameworks. WLJAI, Vol. 2. DOI: 10.WL/NEX.2024.07",
    },
  ];

  const projects: Project[] = [
    {
      type: "project",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      stage: "Beta",
      title: "SolarGrid-IoT v2.0",
      description:
        "A hardware/software stack for micro-utility billing in off-grid communities.",
      tags: ["R2I Output", "Energy Sector"],
    },
    {
      type: "project",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=800",
      stage: "Alpha",
      title: "HealthTrack Mobile",
      description:
        "Decentralized health record system for rural clinics with offline-first architecture.",
      tags: ["Prototype", "Healthcare"],
    },
    {
      type: "project",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      stage: "Production",
      title: "AgriSense Platform",
      description:
        "IoT-based crop monitoring system for smallholder farmers with predictive analytics.",
      tags: ["Agriculture", "IoT"],
    },
  ];

  const impacts: Impact[] = [
    {
      type: "impact",
      quote:
        "The Nexus platform provided the proof-of-work we needed to secure $2M in scale-up funding.",
      author: "Project Lead, Urban Resilience",
      metrics: [
        { label: "Reach", value: "12,400+" },
        { label: "Accuracy", value: "99.8%" },
      ],
    },
    {
      type: "impact",
      quote:
        "Our research validation through Nexus accelerated policy adoption by 8 months.",
      author: "Dr. Sarah Mbeki, Research Director",
      metrics: [
        { label: "Policy Impact", value: "3 Countries" },
        { label: "Adoption Rate", value: "94%" },
      ],
    },
  ];

  const allItems: ContentItem[] = [...publications, ...projects, ...impacts];
  const filteredItems =
    activeFilter === "all"
      ? allItems
      : allItems.filter((item) => item.type === activeFilter);

  const toggleCitation = (id: string) => {
    setActiveCitation(activeCitation === id ? null : id);
  };

  const isPublication = (item: ContentItem): item is Publication =>
    item.type === "publication";
  const isProject = (item: ContentItem): item is Project =>
    item.type === "project";
  const isImpact = (item: ContentItem): item is Impact =>
    item.type === "impact";

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            if (isPublication(item)) {
              return (
                <div
                  key={index}
                  className="nexus-item publication bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col nexus-card"
                >
                  <div className="p-6 md:p-8 flex-grow">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                      <span className="bg-emerald-50 text-brand-green text-2xs font-extrabold uppercase tracking-widest px-2 py-1 rounded border border-brand-green/10">
                        {item.badge}
                      </span>
                      <span className="text-slate-400 text-2xs font-mono">
                        {item.ref}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl mb-4 leading-tight font-bold text-brand-dark group-hover:text-brand-green transition">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter mb-4">
                      {item.authors}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-3xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-extrabold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 md:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <button className="text-brand-green text-[11px] font-extrabold uppercase tracking-wider flex items-center hover:opacity-80">
                      <FileText size={12} className="mr-2" />
                      View Journal entry
                    </button>
                    <button
                      onClick={() => toggleCitation(item.id)}
                      className="text-slate-500 text-[11px] font-extrabold uppercase tracking-wider hover:text-brand-orange transition"
                    >
                      Cite
                    </button>
                  </div>
                  {activeCitation === item.id && (
                    <div className="p-4 bg-brand-dark text-white text-2xs font-mono border-t border-brand-green">
                      {item.citation}
                    </div>
                  )}
                </div>
              );
            } else if (isProject(item)) {
              return (
                <div
                  key={index}
                  className="nexus-item project bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col nexus-card"
                >
                  <div className="h-48 md:h-52 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-brand-orange text-white text-2xs font-extrabold uppercase tracking-widest px-2 py-1 rounded">
                        Stage: {item.stage}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-grow">
                    <h3 className="text-lg md:text-xl mb-3 font-bold text-brand-dark">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center text-2xs font-bold text-slate-400 gap-4 uppercase tracking-tighter">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="flex items-center">
                          <Microchip size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <button className="w-full border-2 border-brand-dark text-brand-dark py-3 rounded text-[11px] font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition">
                      Explore Technical Docs
                    </button>
                  </div>
                </div>
              );
            } else if (isImpact(item)) {
              return (
                <div
                  key={index}
                  className="nexus-item impact bg-brand-dark text-white border border-slate-800 rounded-xl overflow-hidden flex flex-col nexus-card"
                >
                  <div className="p-6 md:p-8 flex-grow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-green rounded-full blur-3xl opacity-20"></div>
                    <div className="text-brand-orange mb-6">
                      <Quote size={24} />
                    </div>
                    <h3 className="serif text-xl md:text-2xl mb-4 italic leading-tight">
                      "{item.quote}"
                    </h3>
                    <p className="text-slate-400 text-xs mb-8 uppercase tracking-widest font-bold">
                      — {item.author}
                    </p>
                    <div className="space-y-4">
                      {item.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-end border-b border-white/10 pb-2"
                        >
                          <span className="text-xs text-slate-500 font-bold uppercase">
                            {metric.label}
                          </span>
                          <span
                            className={`text-xl md:text-2xl font-extrabold ${
                              i === 0 ? "text-brand-green" : "text-brand-orange"
                            }`}
                          >
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 bg-white/5 border-t border-white/10 text-center">
                    <a
                      href="#"
                      className="text-2xs font-bold uppercase tracking-[0.2em] text-brand-green hover:text-white transition inline-flex items-center"
                    >
                      View Case Study PDF
                      <ExternalLink size={10} className="ml-2" />
                    </a>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentGridSection;
