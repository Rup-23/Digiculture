"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left Section */}
          <div>
            <h2 className="text-xl font-semibold text-white">Digital Museum</h2>
            <p className="text-sm text-gray-400 mt-2">
              Preserving untold stories from around the world.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <SocialIcon href="https://instagram.com" Icon={FaInstagram} />
            <SocialIcon href="https://facebook.com" Icon={FaFacebookF} />
            <SocialIcon href="https://linkedin.com" Icon={FaLinkedinIn} />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Digital Museum. All rights reserved.
        </div>
      </div>
    </footer>
  );

}

// Reusable Social Media Icon Component
function SocialIcon({ href, Icon }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
    </Link>
  );
}


