"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Send,
  ShieldCheck,
  Key,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      emailChecked
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, codeRequested, emailChecked]);

  const sendVerificationCode = async () => {
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setCodeSending(true);
      toast.loading("Sending verification code...");

      // Replace with your actual API endpoint for sending code
     const res = await axios.post("/Api/Users/emailverification/sendCode", {
        email: user.email,
        path : "register",
      });
      console.log("send code res  === ", res.data?.alreadyAccount);
      if(!res.data?.noAccount){
        toast.error(res.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 800);
      }

      toast.dismiss();
      toast.success(res.data.message);
      setCodeRequested(true);
    } catch (error: unknown) {
      toast.dismiss();

      let errorMessage = "Failed to send verification code";

      if (typeof error === "object" && error !== null) {
        const maybeError = error as {
          response?: { data?: { error?: string } };
        };
        if (maybeError.response?.data?.error) {
          errorMessage = maybeError.response.data.error;
        }
      }

      toast.error(errorMessage);
      console.log(error);
    } finally {
      setCodeSending(false);
    }
  };
  const checkVerificationCode = async () => {
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setCodeSending(true);
      toast.loading("verifing code...");

      await axios.post("/Api/Users/emailverification/checkCode", {
        email: user.email,
        code: verificationCode,
      });
      toast.dismiss();
      toast.success("Code verified");
      setEmailChecked(true);
    } catch (error: unknown) {
      toast.dismiss();

      let errorMessage = "Failed to verify code";

      if (typeof error === "object" && error !== null) {
        const maybeError = error as {
          response?: { data?: { error?: string } };
        };
        if (maybeError.response?.data?.error) {
          errorMessage = maybeError.response.data.error;
        }
      }

      toast.error(errorMessage);
      console.log(error);
    } finally {
      setCodeSending(false);
    }
  };

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setButtonDisabled(true);
      toast.loading("Creating your account...");

      await axios.post("/Api/Users/signup", user);

      toast.dismiss();
      toast.success("Account created successfully!");

      // Add a small delay for better UX
      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (error: unknown) {
      toast.dismiss();

      let errorMessage = "Something went wrong";

      if (typeof error === "object" && error !== null) {
        const maybeError = error as {
          response?: { data?: { error?: string } };
        };
        if (maybeError.response?.data?.error) {
          errorMessage = maybeError.response.data.error;
        }
      }

      toast.error(errorMessage);

      console.log(error);
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  // Animation variants
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
    <div className="min-h-screen mt-10 bg-gradient-to-br from-slate-900 to-slate-700 flex justify-center items-center p-4">
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
                <User size={36} className="text-white" />
              </div>
              <h1 className="text-white text-2xl font-bold mt-4">
                Create Account
              </h1>
              <p className="text-white/70 text-sm mt-2">
                Join our platform today
              </p>
            </motion.div>
          </div>

          <form onSubmit={onSignUp} className="p-8">
            <div className="space-y-5">
              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute left-3 top-4 text-gray-400">
                  <User size={18} />
                </div>
                <motion.input
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  value={user.username}
                  className="w-full bg-slate-700/50 text-white px-10 py-3 rounded-lg focus:outline-none border border-slate-600 focus:border-blue-500 transition-all"
                  required
                  title="Username must be 3-20 characters and can contain letters, numbers, dots (.) and underscores (_)"
                  pattern="^[a-zA-Z0-9._]{3,20}$"
                  placeholder="Username"
                  whileFocus="focused"
                  initial="unfocused"
                  animate="unfocused"
                  variants={inputVariants}
                />
              </motion.div>
               <motion.div
                              className="relative flex w-full bg-slate-700/50 text-whiteoutline-none rounded-lg focus:outline-none border focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] border-slate-600 focus-within:border-blue-500 focus-within:scale-105"
                              variants={itemVariants}
                            >
                <div className="absolute left-3 top-4 text-gray-400">
                  <Mail size={18} />
                </div>
                <motion.input
                  type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  className="w-full bg-slate-700/50 text-white pl-10 pr-3 py-3 rounded-l-lg outline-none border border-slate-600 transition-all"
                  required
                  title="Please enter a valid email address (example: name@example.com)"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  placeholder="Email"
                  whileFocus="focused"
                  initial="unfocused"
                  animate="unfocused"
                  disabled={emailChecked}
                  // variants={inputVariants}
                />
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={!user.email || codeSending || emailChecked}
                  className={`${
                    !user.email || codeSending || emailChecked
                      ? "bg-blue-500/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-1 px-2 rounded-r-lg text-xs font-medium transition-all duration-200 flex items-center gap-1`}
                >
                  {codeSending ? (
                    <svg
                      className="animate-spin h-3 w-3 text-white"
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
                      <Send size={24} /> Send Code
                    </>
                  )}
                </button>
              </motion.div>

              {codeRequested && (
                <motion.div
                  className="relative"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="absolute left-3 top-4 text-gray-400">
                    <Key size={18} />
                  </div>
                  <motion.input
                    type="text"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                    disabled={emailChecked || !codeRequested}
                    className="w-full bg-slate-700/50 text-white px-10 py-3 rounded-lg focus:outline-none border border-slate-600 focus:border-blue-500 transition-all"
                    required
                    placeholder="Verification Code"
                    whileFocus="focused"
                    initial="unfocused"
                    animate="unfocused"
                    variants={inputVariants}
                  />
                  <button
                    type="button"
                    onClick={checkVerificationCode}
                    disabled={
                      !codeRequested ||
                      !(verificationCode.length > 0) ||
                      emailChecked
                    }
                    className={`absolute right-3 top-2.5 ${
                      !verificationCode
                        ? "bg-blue-500/50 cursor-not-allowed"
                        : emailChecked
                        ? "bg-green-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white py-1 px-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1`}
                  >
                    {codeSending ? (
                      <svg
                        className="animate-spin h-3 w-3 text-white"
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
                        {emailChecked ? (
                          <>
                            <ShieldCheck size={12} /> Verified{" "}
                          </>
                        ) : (
                          "Verify"
                        )}
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              <motion.div className="relative" variants={itemVariants}>
                <div className="absolute left-3 top-4 text-gray-400">
                  <Lock size={18} />
                </div>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  className="w-full bg-slate-700/50 text-white px-10 py-3 rounded-lg focus:outline-none border border-slate-600 focus:border-blue-500 transition-all"
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must be at least 8 characters, with uppercase, lowercase, number, and special character."
                  placeholder="Password"
                  whileFocus="focused"
                  initial="unfocused"
                  animate="unfocused"
                  variants={inputVariants}
                />
                <button
                  type="button"
                  className="absolute right-3 top-4 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  className={`w-full flex items-center justify-center gap-2 ${
                    buttonDisabled
                      ? "bg-blue-500/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-3 px-4 rounded-lg font-medium transition-all duration-200`}
                  type="submit"
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
                      Sign Up <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mt-6">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-all"
                  >
                    Log In
                  </Link>
                </p>
              </motion.div>
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-4 text-center text-white/60 text-sm"
        >
          Protected by industry-standard encryption
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
