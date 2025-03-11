// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import HeroSection from "../components/HeroSection";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const HomePage = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     async function fetchStories() {
//       try {
//         const response = await fetch("/api/stories", { cache: "no-store" });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setStories(data.slice(0, 5)); // Show only the latest 5 stories
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     }

//     fetchStories();
//   }, []);

//   const sections = [
//     { name: "Folklore", image: "/img4.jpg", desc: "Tales from the past." },
//     { name: "Myth", image: "/img5.jpg", desc: "Legends and gods." },
//     { name: "Real-Life", image: "/img7.jpg", desc: "True stories of people." },
//     { name: "Local Culture", image: "/img9.jpg", desc: "Traditions and customs." },
//   ];

//   return (
//     <div className="container mx-auto">
//       <HeroSection />
//       <div className="text-center mb-8 mt-7">
//         <h1 className="text-4xl font-bold">Welcome to the Story Hub</h1>
//       </div>

//       {/* Category Carousel */}
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop
//         className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
//       >
//         {sections.map((section) => (
//           <SwiperSlide key={section.name}>
//             <Link href={`/stories?category=${section.name}`}>
//               <div className="relative w-full h-full cursor-pointer">
//                 <img
//                   src={section.image}
//                   alt={section.name}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
//                   <h2 className="text-3xl font-bold">{section.name}</h2>
//                   <p className="text-lg mt-2">{section.desc}</p>
//                   <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Latest Stories */}
//       <h2 className="text-3xl text-center font-bold mb-8 ml-5">Latest Stories</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {stories.length > 0 ? (
//           stories.map((story) => {
//             const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
//             const preview = textContent.substring(0, 150) + "...";
//             const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

//             return (
//               <div key={story._id} className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
//                 <div className="md:w-1/2 h-64"> {/* Fixed height for the image container */}
//                   <img src={imageUrl} alt={story.title} className="object-contain w-full h-full" />
//                 </div>
//                 <div className="p-6 md:w-1/2">
//                   <h3 className="text-2xl font-semibold mb-2 text-gray-800">{story.title}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{story.storyType}</p>
//                   <p className="text-gray-700 text-sm leading-relaxed mb-4">{preview}</p>
//                   <Link href={`/stories/${story._id}`}>
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
//                       Read More
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-600">No stories available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import HeroSection from "../components/HeroSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    async function fetchStories() {
      try {
        console.log("Fetching stories...");
        const query = new URLSearchParams({ status: "approved" });

        if (selectedCategory) {
          query.append("category", selectedCategory);
        }

        const response = await fetch(`/api/stories?${query.toString()}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Stories:", data);

        setStories(data.success ? data.stories : []);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [selectedCategory]);

  const sections = [
    { name: "Folklore", image: "/img4.jpg", desc: "Tales from the past." },
    { name: "Myth", image: "/img5.jpg", desc: "Legends and gods." },
    { name: "Real-Life", image: "/img7.jpg", desc: "True stories of people." },
    { name: "Local Culture", image: "/img9.jpg", desc: "Traditions and customs." },
  ];

  return (
    <div className="container mx-auto">
      <HeroSection />
      <div className="text-center mb-8 mt-7">
        <h1 className="text-4xl font-bold">Welcome to the Story Hub</h1>
      </div>

      {/* Category Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
      >
        {sections.map((section) => (
          <SwiperSlide key={section.name}>
            <Link href={`/stories?category=${encodeURIComponent(section.name)}`}>
              <div className="relative w-full h-full cursor-pointer">
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
                  <h2 className="text-3xl font-bold">{section.name}</h2>
                  <p className="text-lg mt-2">{section.desc}</p>
                  <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg">Learn More</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Stories */}
      <h2 className="text-3xl text-center font-bold mb-8 ml-5">Latest Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading stories...</p>
        ) : stories.length > 0 ? (
          stories.map((story) => {
            const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
            const preview = textContent.substring(0, 150) + "...";
            const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

            return (
              <div
                key={story._id}
                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="md:w-1/2 h-64">
                  <img src={imageUrl} alt={story.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{story.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{story.storyType}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{preview}</p>
                  <Link href={`/stories/${story._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No stories available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
