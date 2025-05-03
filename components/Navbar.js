"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black bg-opacity-90 backdrop-blur-lg shadow-xl" 
          : "bg-black bg-opacity-60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2"
          >
            <span className="text-3xl font-serif font-bold tracking-wider text-amber-500 group-hover:text-amber-400 transition-all duration-300">
              DG CULTURE
            </span>
            <span className="hidden md:block h-6 w-px bg-amber-500/30"></span>
            <span className="hidden md:block text-sm uppercase tracking-widest text-amber-500/80">
              Digital Museum of Untold Stories
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              <NavLink href="/" text="Home" />
              <NavLink href="/about" text="About" />
              <NavLink href="/stories" text="Stories" />
              <NavLink href="/contact" text="Contact" />
            </div>
            
            <div className="ml-6 flex items-center">
              <div className="h-8 w-px bg-amber-500/30 mr-6"></div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 mr-4"
                }
              }}
            />
            <button
              className="text-amber-500 hover:text-amber-400 focus:outline-none transition duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-black bg-opacity-95 border-t border-amber-900/30 px-4 py-3 space-y-3">
          <NavLink href="/" text="Home" mobile setMenuOpen={setMenuOpen} />
          <NavLink href="/about" text="About" mobile setMenuOpen={setMenuOpen} />
          <NavLink href="/stories" text="Stories" mobile setMenuOpen={setMenuOpen} />
          <NavLink href="/contact" text="Contact" mobile setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </nav>
  );
}

// Enhanced NavLink Component with refined hover effect
function NavLink({ href, text, mobile, setMenuOpen }) {
  return (
    <Link
      href={href}
      className={`relative ${
        mobile
          ? "block py-3 text-lg text-amber-500 hover:text-amber-400 border-b border-amber-900/30 transition duration-300"
          : "px-5 py-2 text-amber-500 hover:text-amber-400 font-medium relative overflow-hidden group"
      }`}
      onClick={() => mobile && setMenuOpen(false)}
    >
      {!mobile && (
        <>
          <span className="relative z-10 transition duration-300">{text}</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
        </>
      )}
      {mobile && text}
    </Link>
  );
}