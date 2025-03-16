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
    <footer className="bg-[#1a1a1a] text-gray-300 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left - About Section */}
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-[#d4af37]">Digital Museum</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              A place where untold stories of history come alive. 
              Experience the lost voices of culture, heritage, and time.
            </p>
          </div>

          {/* Right - Social Media */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-lg font-semibold text-[#d4af37]">Connect</h3>
            <div className="flex space-x-5 mt-3">
              <SocialIcon href="https://instagram.com" Icon={FaInstagram} />
              <SocialIcon href="https://facebook.com" Icon={FaFacebookF} />
              <SocialIcon href="https://linkedin.com" Icon={FaLinkedinIn} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} <span className="text-[#d4af37]">Digital Museum</span>. 
          All rights reserved.
        </div>
      </div>
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
      <Icon className="w-7 h-7 text-gray-400 hover:text-[#d4af37] transition duration-300 transform hover:scale-110" />
    </Link>
  );
}
