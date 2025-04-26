"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const teamMembers = [
    {
      name: "Alexandra Chen",
      role: "CEO & Co-founder",
      bio: "Former security engineer at Google with 15+ years of experience in identity management.",
      imageUrl: "/api/placeholder/300/300",
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-founder",
      bio: "Previously led engineering at Auth0. Expert in OAuth and OpenID Connect standards.",
      imageUrl: "/api/placeholder/300/300",
    },
    {
      name: "Sophia Rodriguez",
      role: "Head of Product",
      bio: "Product leader passionate about building developer-friendly security solutions.",
      imageUrl: "/api/placeholder/300/300",
    },
    {
      name: "Raj Patel",
      role: "Head of Customer Success",
      bio: "Dedicated to helping customers implement secure authentication seamlessly.",
      imageUrl: "/api/placeholder/300/300",
    },
  ];

  const values = [
    {
      title: "Security First",
      description: "We never compromise on security. Every feature we build undergoes rigorous testing and review.",
    },
    {
      title: "Developer Experience",
      description: "We believe security solutions should be easy to implement and integrate into your workflow.",
    },
    {
      title: "Transparency",
      description: "We&apos;re open about how our systems work, our pricing, and our roadmap for the future.",
    },
    {
      title: "Customer Success",
      description: "Your success is our success. We provide world-class support to help you achieve your goals.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Founded in San Francisco",
      description: "AuthFlow started with a simple mission: make authentication both secure and simple.",
    },
    {
      year: "2021",
      title: "Seed Funding",
      description: "Raised $3.5M to build the first version of our authentication platform.",
    },
    {
      year: "2022",
      title: "Public Launch",
      description: "Released our authentication API with support for multiple frameworks.",
    },
    {
      year: "2023",
      title: "Series A",
      description: "Secured $12M to expand our team and enhance our enterprise offerings.",
    },
    {
      year: "2024",
      title: "Enterprise Focus",
      description: "Introduced advanced security features for large organizations.",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Opened offices in London and Singapore to serve customers worldwide.",
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
                Our Story
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              At AuthFlow, we&apos;re building the future of authentication and identity management.
            </p>
          </motion.div>

          <div className="mt-16">
            <motion.div 
              className="relative bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:grid lg:grid-cols-2">
                <div className="relative h-64 sm:h-96 lg:h-full">
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <Image 
                      src="/api/placeholder/800/600" 
                      alt="About AuthFlow" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
                  <p className="mt-4 text-lg text-gray-500">
                    We founded AuthFlow in 2020 with a clear mission: to make authentication both secure and simple. 
                    Too often, developers are forced to choose between security and user experience, or between 
                    robust features and ease of implementation.
                  </p>
                  <p className="mt-4 text-lg text-gray-500">
                    We&apos;re building a platform that doesn&apos;t compromise on security while ensuring a seamless 
                    developer experience. Our team brings decades of combined experience in cybersecurity, 
                    identity management, and developer tools to create the authentication solution we 
                    always wished existed.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={fadeInUp.hidden}
            animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              These core principles guide everything we do at AuthFlow.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-lg p-6"
                initial={fadeInUp.hidden}
                animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
                initial={fadeInUp.hidden}
                animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Journey</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                  From a small startup to a leading authentication provider.
                </p>
              </motion.div>
    
              <div className="mt-12 max-w-3xl mx-auto">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative pb-12 last:pb-0"
                    initial={fadeInUp.hidden}
                    animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {index !== timeline.length - 1 && (
                      <div className="absolute top-5 left-5 ml-3 h-full w-0.5 bg-blue-200" aria-hidden="true" />
                    )}
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {item.year.substring(2)}
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
    
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={fadeInUp.hidden}
                animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                  Meet the experts building the future of authentication.
                </p>
              </motion.div>
    
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    initial={fadeInUp.hidden}
                    animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="relative h-60 w-full">
                      <Image
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
    
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
            initial={fadeIn.hidden}
            animate={isVisible ? fadeIn.visible : fadeIn.hidden}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Join us on our mission</h2>
              <p className="mt-4 text-xl max-w-2xl mx-auto">
                We&apos;re always looking for talented people passionate about security and great user experiences.
              </p>
              <div className="mt-8">
                <a
                  href="/careers"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  View open positions
                </a>
              </div>
            </div>
          </motion.div>
    
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={fadeInUp.hidden}
                animate={isVisible ? fadeInUp.visible : fadeInUp.hidden}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Customers</h2>
                <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
                  Trusted by companies of all sizes around the world.
                </p>
              </motion.div>
    
              <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <motion.div
                    key={index}
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="h-12 flex items-center justify-center">
                      <div className="h-8 w-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        LOGO {index}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
        </main>
      );
    }
    