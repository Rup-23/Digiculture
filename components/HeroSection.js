// "use client"
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection({ isLoggedIn }) {
//   return (
//     <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
//       {/* Background Image */}
//       <Image
//         src="/img1.jpg" // Image stored in public folder
//         alt="Digital Museum"
//         layout="fill"
//         objectFit="cover"
//         className="absolute inset-0"
//       />

//       {/* Dark Overlay for Better Readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="text-center text-white z-10 px-6">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
//           Uncover the Hidden Stories of the Past
//         </h1>
//         <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-lg">
//           Explore myths, folklore, and real-life tales that never made it to mainstream history.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-4 justify-center">
//           {isLoggedIn ? (
//             <>
//               <Link href="/stories" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition">
//                 Explore Stories
//               </Link>            
//             </>
//           ) : (
//             <Link href="/login" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
//               Login to Explore
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs"; // Clerk ka authentication hook

export default function HeroSection() {
  const { isSignedIn } = useUser(); // Clerk se user login status check karna

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <Image
        src="/img1.jpg"
        alt="Digital Museum"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
      />


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="text-center text-white z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Uncover the Hidden Stories of the Past
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto drop-shadow-lg">
          Explore myths, folklore, and real-life tales that never made it to mainstream history.
        </p>

        {/* Button */}
        <div className="flex gap-4 justify-center">
          <Link
            href={"/stories"} // Redirect to stories page if logged in
            className={`px-6 py-3 font-semibold rounded-lg transition ${isSignedIn ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isSignedIn ? "Explore Stories" : "Login to Explore"}
          </Link>
        </div>
      </div>
    </div>
  );
}
