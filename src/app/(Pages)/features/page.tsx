"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Lock, UserCheck, Globe, Clock, Server, Database } from "lucide-react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featureCards = [
    {
      title: "Multi-factor Authentication",
      description: "Enhance security with SMS, email, or app-based verification options.",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Social Login",
      description: "Allow users to sign in with their existing social media accounts.",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Role-based Access Control",
      description: "Define user permissions with customizable role hierarchies.",
      icon: <UserCheck className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "End-to-end Encryption",
      description: "Secure data with industry-standard encryption protocols.",
      icon: <Lock className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Single Sign-On (SSO)",
      description: "Streamline access across multiple applications with one login.",
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Real-time Monitoring",
      description: "Track authentication events and detect suspicious activities.",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Scalable Infrastructure",
      description: "Handle millions of authentication requests with minimal latency.",
      icon: <Server className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Secure User Management",
      description: "Comprehensive tools for managing user data and profiles.",
      icon: <Database className="h-8 w-8 text-blue-500" />,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      
      <div className="pt-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              AuthFlow provides enterprise-grade authentication capabilities with a developer-friendly experience.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Built for developers, trusted by enterprises
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Our API-first approach means you can integrate secure authentication into your application in minutes, not days.
              </p>
              <div className="mt-8">
                <motion.ul 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {[
                    "Comprehensive documentation",
                    "Multiple SDKs for popular frameworks",
                    "Customizable UI components",
                    "Enterprise-grade security",
                    "99.99% uptime SLA",
                    "24/7 technical support"
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
            <motion.div 
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl rounded-lg p-8 text-white">
                  <pre className="font-mono text-sm overflow-x-auto">
                    {`// Easy to implement
import { AuthFlow } from &apos;@authflow/sdk&apos;;

const auth = new AuthFlow({
  apiKey: &apos;your_api_key&apos;,
  domain: &apos;your-app.com&apos;
});

// One line to authenticate
const user = await auth.signIn(email, password);

// Simple permission checks
if (auth.can(user, &apos;access:admin&apos;)) {
  // Allow admin access
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to secure your application?
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Join thousands of companies that trust AuthFlow for their authentication needs.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      
    </main>
  );
}