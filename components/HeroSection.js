"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Animation
import { useUser } from "@clerk/nextjs";

export default function HeroSection() {
  const { isSignedIn } = useUser();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src="/img1.jpg"
          alt="Digital Museum"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <motion.div
        className="text-center text-white z-10 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
          Discover the Untold Stories
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-300 drop-shadow-lg">
          Dive into the forgotten myths, ancient civilizations, and hidden truths that shaped our world.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/stories"
            className="px-6 py-3 font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition text-gray-900"
          >
            {isSignedIn ? "Explore Stories" : "Login to Explore"}
          </Link>
          <Link
            href="/stories/form"
            className="px-6 py-3 font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white"
          >
            Share your stories
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

