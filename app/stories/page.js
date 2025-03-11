// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");

//   useEffect(() => {
//     async function fetchStories() {
//       try {
//         let url = "/api/stories?status=approved"; // ✅ Ensure fetching only approved stories
//         if (category) {
//           url += `&category=${category}`;
//         }
    
//         const response = await fetch(url, { cache: "no-store" });
    
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
    
//         const data = await response.json();
//         setStories(data.stories); // ✅ Access `stories` inside the response
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     }
    
//     fetchStories();
//   }, [category]);

//   return (
//     <div className="min-h-screen bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
//           {category ? `${category} Stories` : "Stories"}
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {stories.length > 0 ? (
//             stories.map((story) => {
//               const textContent =
//                 story.content?.find((item) => item.type === "text")?.value ||
//                 "No preview available.";
//               const preview = textContent.substring(0, 150) + "...";
//               const imageUrl =
//                 story.content?.find((item) => item.type === "image")?.value ||
//                 "/default-story.jpg";

//               return (
//                 <div
//                   key={story._id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
//                 >
//                   <div className="h-64">
//                     <img
//                       src={imageUrl}
//                       alt={story.title}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-2xl font-semibold mb-2 text-gray-800">
//                       {story.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {story.storyType}
//                     </p>
//                     <p className="text-gray-700 text-sm leading-relaxed mb-4">
//                       {preview}
//                     </p>
//                     <Link href={`/stories/${story._id}`}>
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
//                         Read More
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center text-gray-600">No stories available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stories;



"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchStories() {
      try {
        let url = "/api/stories?status=approved";
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }

        console.log("Fetching stories from:", url); // ✅ Debugging log

        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Stories:", data); // ✅ Debugging log

        if (data.success && Array.isArray(data.stories)) {
          setStories(data.stories);
        } else {
          setStories([]); // No stories found
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      }
    }

    fetchStories();
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
          {category ? `${category} Stories` : "Discover New Stories"}
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.length > 0 ? (
            stories.map((story) => {
              const textContent =
                story.content?.find((item) => item.type === "text")?.value ||
                "No preview available.";
              const preview = textContent.substring(0, 150) + "...";
              const imageUrl =
                story.content?.find((item) => item.type === "image")?.value ||
                "/default-story.jpg";
  
              return (
                <div
                  key={story._id}
                  className="relative bg-white backdrop-blur-md bg-opacity-80 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 truncate">
                      {story.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 mb-2 uppercase">
                      {story.storyType}
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {preview}
                    </p>
                    <Link href={`/stories/${story._id}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 text-lg font-medium">
              No stories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Stories;
