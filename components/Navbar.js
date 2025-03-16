// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { UserButton } from "@clerk/nextjs";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     alert(`Searching for: ${searchQuery}`);
//     setSearchQuery(""); // Reset search bar
//   };

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg fixed top-0 w-full z-50">
//       <div className="w-full px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-white">
//             DigiCulTure
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <NavLink href="/" text="Home" setMenuOpen={setMenuOpen} />
//             <NavLink href="/about" text="About Us" setMenuOpen={setMenuOpen} />
//             <NavLink href="/stories" text="Stories" setMenuOpen={setMenuOpen} />
//             <NavLink href="/contact" text="Contact" setMenuOpen={setMenuOpen} />

//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-white">
//                 <FaSearch />
//               </button>
//             </form>
//             <UserButton />
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-400 hover:text-white focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {menuOpen && (
//           <div className="md:hidden rounded-lg shadow-md p-5 space-y-5">
//             <NavLink href="/" text="Home" mobile setMenuOpen={setMenuOpen} />
//             <NavLink href="/about" text="About Us" mobile setMenuOpen={setMenuOpen} />
//             <NavLink href="/stories" text="Stories" mobile setMenuOpen={setMenuOpen} />
//             <NavLink href="/contact" text="Contact" mobile setMenuOpen={setMenuOpen} />

//             {/* Search Bar in Mobile */}
//             <form onSubmit={handleSearch} className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 className="flex-1 bg-gray-700 text-white px-3 py-3 rounded-full focus:outline-none"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="bg-blue-500 p-3 rounded-full">
//                 <FaSearch className="text-white size-5 " />
//               </button>
//             </form>

//             {/* User Button positioned properly */}
//             <div className="flex justify-center">
//               <UserButton />
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Reusable NavLink Component (Now closes menu on click)
// function NavLink({ href, text, mobile, setMenuOpen }) {
//   return (
//     <Link
//       href={href}
//       className={`block ${
//         mobile ? "py-2 text-center text-gray-300 hover:text-white" : "text-gray-400 hover:text-white transition duration-300"
//       }`}
//       onClick={() => setMenuOpen(false)} // Close menu when clicked
//     >
//       {text}
//     </Link>
//   );
// }



"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <nav className="bg-opacity-80 backdrop-blur-lg bg-[#0A0A0A] text-[#E0C097] shadow-xl fixed top-0 w-full z-50 border-b border-[#E0C097]">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold tracking-widest text-[#F4A261] drop-shadow-lg">
            DigiCulTure
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center text-lg font-medium">
            <NavLink href="/" text="Home" setMenuOpen={setMenuOpen} />
            <NavLink href="/about" text="About" setMenuOpen={setMenuOpen} />
            <NavLink href="/stories" text="Stories" setMenuOpen={setMenuOpen} />
            <NavLink href="/contact" text="Contact" setMenuOpen={setMenuOpen} />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                className="bg-[#1B1B1B] text-[#E0C097] px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9C46A] placeholder-gray-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 text-[#E9C46A] hover:text-white">
                <FaSearch size={18} />
              </button>
            </form>
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E9C46A] hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] bg-opacity-90 rounded-lg shadow-lg p-6 space-y-5 border border-[#E0C097]">
            <NavLink href="/" text="Home" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/about" text="About" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/stories" text="Stories" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/contact" text="Contact" mobile setMenuOpen={setMenuOpen} />

            {/* Search Bar in Mobile */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 bg-[#1B1B1B] text-[#E0C097] px-2 py-3 rounded-full focus:outline-none placeholder-gray-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-[#E9C46A] p-2 rounded-full">
                <FaSearch className="text-[#16213E] size-5" />
              </button>
            </form>

            {/* User Button positioned properly */}
            <div className="flex justify-center">
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable NavLink Component with hover effect
function NavLink({ href, text, mobile, setMenuOpen }) {
  return (
    <Link
      href={href}
      className={`block ${
        mobile
          ? "py-2 text-center text-[#E0C097] hover:text-[#F4A261]"
          : "text-[#E0C097] hover:text-[#F4A261] transition duration-300"
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {text}
    </Link>
  );
}