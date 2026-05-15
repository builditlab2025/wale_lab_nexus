// src/components/payment/SubscriptionPlans.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Zap,
  Shield,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const publication = location.state?.publication;

  const plans = [
    {
      id: "monthly",
      name: "Monthly Subscription",
      price: 29.99,
      period: "month",
      description: "Perfect for active researchers",
      features: [
        "Unlimited access to all premium publications",
        "Download up to 50 PDFs per month",
        "Email support",
        "Access to technical reports",
        "Citation export tools",
      ],
      popular: false,
      icon: Zap,
    },
    {
      id: "yearly",
      name: "Yearly Subscription",
      price: 299.99,
      period: "year",
      description: "Best value for institutions",
      features: [
        "Unlimited access to all premium publications",
        "Unlimited downloads",
        "Priority email & chat support",
        "Access to all technical reports",
        "Citation export tools",
        "Early access to new research",
        "20% discount on open access fees",
      ],
      popular: true,
      icon: Shield,
    },
    {
      id: "single",
      name: "Single Purchase",
      price: publication?.price || 49.99,
      period: "one-time",
      description: "Pay per publication",
      features: [
        "Full access to this publication",
        "PDF download",
        "Lifetime access",
        "Citation export",
      ],
      popular: false,
      icon: BookOpen,
    },
  ];

  const handleSubscribe = async (_: string) => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Payment successful! You now have full access.");
      setTimeout(() => {
        navigate("/external-catalog");
      }, 1500);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const visiblePlans = publication
    ? plans.filter((p) => p.id === "single")
    : plans.filter((p) => p.id !== "single");

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-brand">
            Choose Your <span className="text-[#f8921e]">Plan</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get unlimited access to cutting-edge research and innovation from
            Wale University
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? "border-[#00a708] scale-105"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#00a708] text-white px-4 py-1 text-sm font-bold uppercase tracking-wider transform rotate-45 translate-x-8 translate-y-4">
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-xl ${plan.popular ? "bg-[#00a708]/10" : "bg-slate-100"}`}
                      >
                        <Icon
                          className={`w-6 h-6 ${plan.popular ? "text-[#00a708]" : "text-slate-600"}`}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#02250a]">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-slate-500 mb-4">{plan.description}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#02250a]">
                        ${plan.price}
                      </span>
                      <span className="text-slate-500">/{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <Check className="w-4 h-4 text-[#00a708]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isProcessing && selectedPlan === plan.id}
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-[#00a708] text-white hover:bg-[#02250a]"
                          : "border-2 border-[#00a708] text-[#00a708] hover:bg-[#00a708] hover:text-white"
                      }`}
                    >
                      {isProcessing && selectedPlan === plan.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Started
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">
              Secure payment methods
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">Visa</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">PayPal</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
