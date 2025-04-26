"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for side projects and small applications.",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { name: "Up to 1,000 monthly active users", included: true },
        { name: "Email & password authentication", included: true },
        { name: "Basic user management", included: true },
        { name: "Community support", included: true },
        { name: "Social login providers", included: false },
        { name: "Multi-factor authentication", included: false },
        { name: "Custom domains", included: false },
        { name: "Advanced security features", included: false },
      ],
      cta: "Start for free",
      ctaLink: "/register",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For growing businesses with advanced needs.",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        { name: "Up to 10,000 monthly active users", included: true },
        { name: "Email & password authentication", included: true },
        { name: "Full user management", included: true },
        { name: "Priority support", included: true },
        { name: "Social login providers", included: true },
        { name: "Multi-factor authentication", included: true },
        { name: "Custom domains", included: true },
        { name: "Advanced security features", included: false },
      ],
      cta: "Start with Pro",
      ctaLink: "/register?plan=pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations needing max security.",
      monthlyPrice: 99,
      annualPrice: 89,
      features: [
        { name: "Unlimited monthly active users", included: true },
        { name: "Email & password authentication", included: true },
        { name: "Full user management", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Social login providers", included: true },
        { name: "Multi-factor authentication", included: true },
        { name: "Custom domains", included: true },
        { name: "Advanced security features", included: true },
      ],
      cta: "Contact sales",
      ctaLink: "/contact",
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      
      <div className="pt-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Choose the plan that fits your needs. All plans include core authentication features.
            </p>
          </motion.div>

          <motion.div
            initial={fadeIn.hidden}
            animate={isVisible ? fadeIn.visible : fadeIn.hidden}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 max-w-lg mx-auto flex justify-center"
          >
            <div className="relative bg-gray-100 p-1 rounded-lg inline-block">
              <button
                className={`relative px-4 py-2 text-sm font-medium ${
                  !annual ? "text-blue-700 bg-white shadow-sm rounded-md" : "text-gray-700"
                } transition-all duration-200 focus:outline-none`}
                onClick={() => setAnnual(false)}
              >
                Monthly billing
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium ${
                  annual ? "text-blue-700 bg-white shadow-sm rounded-md" : "text-gray-700"
                } transition-all duration-200 focus:outline-none`}
                onClick={() => setAnnual(true)}
              >
                Annual billing
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Save 15%
                </span>
              </button>
            </div>
          </motion.div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`bg-white rounded-lg overflow-hidden ${
                  plan.highlighted
                    ? "ring-2 ring-blue-500 shadow-xl transform lg:-translate-y-4"
                    : "shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-blue-500 text-white py-2 text-center text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-1 text-gray-500">{plan.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
                  </div>
                  {annual && plan.annualPrice > 0 && (
                    <p className="mt-1 text-sm text-green-600">Billed annually (${plan.annualPrice * 12}/year)</p>
                  )}
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 flex-shrink-0 mr-2" />
                        )}
                        <span className={feature.included ? "text-gray-600" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a
                      href={plan.ctaLink}
                      className={`w-full block text-center px-6 py-3 border border-transparent rounded-md shadow text-base font-medium ${
                        plan.highlighted
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      } transition-colors duration-200`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        className="bg-gray-50 py-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-500">
              Get answers to the most common questions about our pricing and plans.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                question: "How do you count monthly active users?",
                answer: "A monthly active user (MAU) is any unique user who authenticates at least once during a calendar month. We don&apos;t count API calls or page views—only authentication events."
              },
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer: "Yes, you can change your plan at any time. When upgrading, we&apos;ll prorate the remaining days in your billing cycle. When downgrading, the new pricing takes effect on your next billing date."
              },
              {
                question: "Do you offer a free trial?",
                answer: "All plans start with a 14-day free trial with full access to all features. No credit card required to start. You&apos;ll only be charged when you decide to continue with a paid plan."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise customers, we also support invoicing with net-30 payment terms."
              },
              {
                question: "Is there a long-term contract?",
                answer: "No. All plans are month-to-month or year-to-year, and you can cancel anytime. There are no setup fees or cancellation penalties."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow p-6"
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-500">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Need a custom solution?</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Contact our sales team for enterprise plans, custom requirements, or volume discounts.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact sales
            </a>
          </div>
        </div>
      </motion.div>
      
    </main>
  );
}
