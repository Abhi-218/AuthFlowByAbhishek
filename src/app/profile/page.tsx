
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, LogOut, RefreshCw } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: "", email: "", _id: "" });
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Automatically fetch profile data on component mount
  useEffect(() => {
    Profiledetail();
  }, []);

  const Profiledetail = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/Api/Users/me");
      setData({
        username: response.data.data.username,
        email: response.data.data.email,
        _id: response.data.data._id,
      });
      setProfileLoaded(true);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/Api/Users/logout");
      
      // Animated transition before redirect
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex justify-center items-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <motion.div 
          className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-8">
            <motion.div 
              className="flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="bg-white/10 rounded-full p-5 backdrop-blur-sm">
                <User size={48} className="text-white" />
              </div>
            </motion.div>
          </div>

          <div className="p-8">
            {profileLoaded ? (
              <div className="space-y-6">
                <motion.div 
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Username</p>
                    <p className="text-white font-medium text-lg">{data.username}</p>
                    <div className="h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium text-lg">{data.email}</p>
                    <div className="h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">User ID</p>
                    <p className="text-white font-mono text-sm truncate">{data._id}</p>
                    <div className="h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex gap-4 pt-6"
                  variants={itemVariants}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium w-1/2 transition-all duration-200"
                    onClick={Profiledetail}
                    disabled={loading}
                  >
                    <RefreshCw size={18} className={`${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium w-1/2 transition-all duration-200"
                    onClick={Logout}
                    disabled={loading}
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center py-8"
                variants={itemVariants}
              >
                <div className="animate-pulse flex flex-col items-center space-y-6 w-full">
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                  <div className="flex gap-4 w-full pt-4">
                    <div className="h-10 bg-slate-700 rounded w-1/2"></div>
                    <div className="h-10 bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-4 text-center text-white/60 text-sm"
        >
          {profileLoaded ? "Your profile is currently active" : "Loading your profile..."}
        </motion.div>
      </motion.div>
      
    </div>
  );
};

export default ProfilePage;