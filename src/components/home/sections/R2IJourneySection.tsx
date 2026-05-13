import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  badge: string;
  color: string;
}

const R2IJourneySection: React.FC = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Deep Research",
      description:
        "Original investigation resulting in peer-reviewed intellectual authority.",
      badge: "WJAI Indexed",
      color: "brand-green",
    },
    {
      number: "02",
      title: "Translation",
      description:
        "Prototyping theories into functional assets and technical frameworks.",
      badge: "Execution Proof",
      color: "brand-orange",
    },
    {
      number: "03",
      title: "Impact",
      description:
        "Deployed solutions creating measurable longitudinal change.",
      badge: "Public Credibility",
      color: "brand-dark",
    },
  ];

  const getColorClass = (color: string, type: "border" | "bg" | "text") => {
    const colorMap = {
      "brand-green": {
        border: "border-brand-green",
        bg: "bg-brand-green",
        text: "text-brand-green",
      },
      "brand-orange": {
        border: "border-brand-orange",
        bg: "bg-brand-orange",
        text: "text-brand-orange",
      },
      "brand-dark": {
        border: "border-brand-dark",
        bg: "bg-brand-dark",
        text: "text-brand-dark",
      },
    };
    return colorMap[color as keyof typeof colorMap]?.[type] || "";
  };

  return (
    <section
      id="r2i"
      className="py-16 md:py-24 bg-brand-bg border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-brand-orange font-extrabold text-2xs uppercase tracking-[0.5em] mb-4">
            Our Methodology
          </h4>
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl  text-brand-dark">
            The Research-to-Impact (R2I) Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative z-10 bg-white p-6 md:p-10 border-t-4 ${getColorClass(step.color, "border")} shadow-sm group hover:shadow-xl transition`}
            >
              <div
                className={`w-10 h-10 ${getColorClass(step.color, "bg")} text-white flex items-center justify-center font-bold mb-6 rounded`}
              >
                {step.number}
              </div>
              <h3 className="font-extrabold text-base md:text-lg mb-2 uppercase tracking-tight text-brand-dark">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              <div
                className={`text-2xs font-bold ${step.color === "brand-dark" ? "text-slate-400" : getColorClass(step.color, "text")} uppercase tracking-widest`}
              >
                {step.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default R2IJourneySection;
