// File: app/components/Footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                AuthFlow
              </span>
            </h2>
            <p className="text-gray-500 text-base">
              Secure authentication for modern web applications. Protect your users&apos; data with our robust authentication system.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/solutions/authentication" className="text-base text-gray-500 hover:text-gray-900">
                      Authentication
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/authorization" className="text-base text-gray-500 hover:text-gray-900">
                      Authorization
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/identity" className="text-base text-gray-500 hover:text-gray-900">
                      Identity Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/enterprise" className="text-base text-gray-500 hover:text-gray-900">
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/pricing" className="text-base text-gray-500 hover:text-gray-900">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/documentation" className="text-base text-gray-500 hover:text-gray-900">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-base text-gray-500 hover:text-gray-900">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/api-status" className="text-base text-gray-500 hover:text-gray-900">
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2025 AuthFlow, Inc. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="py-2 px-4 pr-12 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <button
                    type="submit"
                    className="inline-flex items-center border border-transparent rounded-md p-2 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}