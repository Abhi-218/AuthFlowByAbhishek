
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      toast.loading("Logging you in...");

      const response = await axios.post("/Api/Users/login", user);

      toast.dismiss();
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Check your credentials");
      console.log(error);
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" },
    unfocused: { scale: 1, boxShadow: "none" },
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              variants={itemVariants}
            >
              <div className="bg-white/10 rounded-full p-4 backdrop-blur-sm">
                <LogIn size={36} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mt-4">Login</h1>
              <p className="text-white/70 text-sm mt-2">
                Access your account below
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            <div className="space-y-5">
              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute left-3 top-3 text-gray-400">
                  <Mail size={18} />
                </div>
                <motion.input
                  type="email"
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  value={user.email}
                  className="w-full bg-slate-700/50 text-white px-10 py-3 rounded-lg focus:outline-none border border-slate-600 focus:border-blue-500 transition-all"
                  required
                  placeholder="Email"
                  whileFocus="focused"
                  initial="unfocused"
                  animate="unfocused"
                  variants={inputVariants}
                />
              </motion.div>

              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={18} />
                </div>
                <motion.input
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  className="w-full bg-slate-700/50 text-white px-10 py-3 rounded-lg focus:outline-none border border-slate-600 focus:border-blue-500 transition-all"
                  required
                  placeholder="Password"
                  whileFocus="focused"
                  initial="unfocused"
                  animate="unfocused"
                  variants={inputVariants}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  className={`w-full flex items-center justify-center gap-2 ${
                    buttonDisabled
                      ? "bg-blue-500/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-3 px-4 rounded-lg font-medium transition-all duration-200`}
                  onClick={onLogin}
                  disabled={buttonDisabled || loading}
                  whileHover={!buttonDisabled ? { scale: 1.02 } : {}}
                  whileTap={!buttonDisabled ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      Login <LogIn size={18} />
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mt-6">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-all"
                  >
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="mt-4 text-center text-white/60 text-sm"
        >
          Welcome back, we've missed you.
        </motion.div>
      </motion.div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
