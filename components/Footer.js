// "use client";
// import Link from "next/link";
// import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-8">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//           {/* Left Section */}
//           <div>
//             <h2 className="text-xl font-semibold text-white">Digital Museum</h2>
//             <p className="text-sm text-gray-400 mt-2">
//               Preserving untold stories from around the world.
//             </p>
//           </div>

//           {/* Social Media Links */}
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <SocialIcon href="https://instagram.com" Icon={FaInstagram} />
//             <SocialIcon href="https://facebook.com" Icon={FaFacebookF} />
//             <SocialIcon href="https://linkedin.com" Icon={FaLinkedinIn} />
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
//           &copy; {new Date().getFullYear()} Digital Museum. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );

// }

// // Reusable Social Media Icon Component
// function SocialIcon({ href, Icon }) {
//   return (
//     <Link href={href} target="_blank" rel="noopener noreferrer">
//       <Icon className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
//     </Link>
//   );
// }


"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] text-gray-300 py-12 border-t border-gray-700 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwTDYwIDBMMzAgNjAiIHN0cm9rZT0iI2Q0YWYzNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left - About Section */}
          <div className="max-w-md">
            <h2 className="text-2xl font-serif font-semibold text-[#d4af37] tracking-wide">Digital Museum</h2>
            <div className="h-px w-20 bg-gradient-to-r from-[#d4af37] to-transparent mt-2 mb-3 hidden md:block"></div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              A place where untold stories of history come alive. 
              Experience the lost voices of culture, heritage, and time.
            </p>
          </div>

          {/* Right - Social Media */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold text-[#d4af37] tracking-wide">Connect</h3>
            <div className="h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent mt-2 mb-3 mx-auto md:mx-0 hidden md:block"></div>
            <div className="flex space-x-5 mt-3 justify-center md:justify-start">
              <SocialIcon href="https://instagram.com" Icon={FaInstagram} />
              <SocialIcon href="https://facebook.com" Icon={FaFacebookF} />
              <SocialIcon href="https://linkedin.com" Icon={FaLinkedinIn} />
            </div>
            <div className="mt-6">
              <Link href="/admin">
                <button className="bg-gradient-to-r from-[#d4af37] to-[#FFD700] text-black font-bold py-3 px-5 rounded-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                  Admin Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <div>
            &copy; {new Date().getFullYear()} <span className="text-[#d4af37]">Digital Museum</span>. 
            All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 text-xs">
            <Link href="/privacy" className="text-gray-500 hover:text-[#d4af37] mx-2 transition-colors duration-300">Privacy Policy</Link>
         </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-8 opacity-30"></div>
    </footer>
  );
}

// Reusable Footer Link Component
function FooterLink({ href, text }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-[#d4af37] transition duration-300"
      >
        {text}
      </Link>
    </li>
  );
}

// Reusable Social Media Icon Component
function SocialIcon({ href, Icon }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2a2a2a] border border-gray-700 hover:border-[#d4af37] transition duration-300">
        <Icon className="w-5 h-5 text-gray-400 hover:text-[#d4af37] transition duration-300 transform hover:scale-110" />
      </div>
    </Link>
  );
}