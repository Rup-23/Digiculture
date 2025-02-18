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
//             <NavLink href="/" text="Home" />
//             <NavLink href="/about" text="About Us" />
//             <NavLink href="/stories" text="Stories" />
//             <NavLink href="/contact" text="Contact" />

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
//           <div className="md:hidden bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
//             <NavLink href="/" text="Home" mobile />
//             <NavLink href="/about" text="About Us" mobile />
//             <NavLink href="/stories" text="Stories" mobile />
//             <NavLink href="/contact" text="Contact" mobile />

//             {/* Search Bar in Mobile */}
//             <form onSubmit={handleSearch} className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-full focus:outline-none"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="bg-blue-500 p-2 rounded-full">
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

// // Reusable NavLink Component
// function NavLink({ href, text, mobile }) {
//   return (
//     <Link
//       href={href}
//       className={`block ${mobile ? "py-2 text-center text-gray-300 hover:text-white" : "text-gray-400 hover:text-white transition duration-300"}`}
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
    setSearchQuery(""); // Reset search bar
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            DigiCulTure
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="/" text="Home" setMenuOpen={setMenuOpen} />
            <NavLink href="/about" text="About Us" setMenuOpen={setMenuOpen} />
            <NavLink href="/stories" text="Stories" setMenuOpen={setMenuOpen} />
            <NavLink href="/contact" text="Contact" setMenuOpen={setMenuOpen} />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-white">
                <FaSearch />
              </button>
            </form>
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden rounded-lg shadow-md p-5 space-y-5">
            <NavLink href="/" text="Home" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/about" text="About Us" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/stories" text="Stories" mobile setMenuOpen={setMenuOpen} />
            <NavLink href="/contact" text="Contact" mobile setMenuOpen={setMenuOpen} />

            {/* Search Bar in Mobile */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 bg-gray-700 text-white px-3 py-3 rounded-full focus:outline-none"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-blue-500 p-3 rounded-full">
                <FaSearch className="text-white size-5 " />
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

// Reusable NavLink Component (Now closes menu on click)
function NavLink({ href, text, mobile, setMenuOpen }) {
  return (
    <Link
      href={href}
      className={`block ${
        mobile ? "py-2 text-center text-gray-300 hover:text-white" : "text-gray-400 hover:text-white transition duration-300"
      }`}
      onClick={() => setMenuOpen(false)} // Close menu when clicked
    >
      {text}
    </Link>
  );
}
