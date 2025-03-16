// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import HeroSection from "../components/HeroSection";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const HomePage = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const selectedCategory = searchParams.get("category") || "";

//   useEffect(() => {
//     async function fetchStories() {
//       try {
//         const query = new URLSearchParams({ status: "approved" });
//         if (selectedCategory) {
//           query.append("category", selectedCategory);
//         }

//         const response = await fetch(`/api/stories?${query.toString()}`, { cache: "no-store" });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         setStories(data.success ? data.stories : []);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//         setStories([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStories();
//   }, [selectedCategory]);

//   const sections = [
//     { name: "Folklore", image: "/img4.jpg", desc: "Tales from the past." },
//     { name: "Myth", image: "/img5.jpg", desc: "Legends and gods." },
//     { name: "Real-Life", image: "/img7.jpg", desc: "True stories of people." },
//     { name: "Local Culture", image: "/img9.jpg", desc: "Traditions and customs." },
//   ];

//   return (
//     <div className="container mx-auto bg-[#1a1a1a] text-white font-serif pb-12">
//       <HeroSection />
//       <div className="text-center mb-8 mt-7">
//         <h1 className="text-5xl font-bold text-[#f4c95d]">The Digital Museum of Untold Stories</h1>
//         <p className="text-lg mt-3 text-gray-400 italic">Preserving history, one story at a time.</p>
//       </div>

//       {/* Museum Showcase Carousel */}
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 4000 }}
//         loop
//         className="w-full h-[400px] md:h-[500px] lg:h-[600px] shadow-lg"
//       >
//         {sections.map((section) => (
//           <SwiperSlide key={section.name}>
//             <Link href={`/stories?category=${encodeURIComponent(section.name)}`}>
//               <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden">
//                 <img src={section.image} alt={section.name} className="w-full h-full object-cover brightness-75" />
//                 <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-gradient-to-t from-black/80 to-transparent p-6">
//                   <h2 className="text-4xl font-bold text-[#f4c95d] drop-shadow-lg">{section.name}</h2>
//                   <p className="text-lg mt-2 text-gray-300">{section.desc}</p>
//                   <button className="mt-4 px-6 py-2 bg-[#f4c95d] text-black rounded-lg text-lg font-bold shadow-md hover:bg-[#d9a944]">Explore</button>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Latest Stories */}
//       <h2 className="text-4xl text-center font-bold mt-12 text-[#f4c95d]">Latest Exhibits</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mt-8">
//         {loading ? (
//           <p className="text-center text-gray-400">Fetching historical artifacts...</p>
//         ) : stories.length > 0 ? (
//           stories.map((story) => {
//             const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
//             const preview = textContent.substring(0, 150) + "...";
//             const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

//             return (
//               <div key={story._id} className="flex flex-col md:flex-row items-center bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
//                 <div className="md:w-1/2 h-64">
//                   <img src={imageUrl} alt={story.title} className="object-cover w-full h-full" />
//                 </div>
//                 <div className="p-6 md:w-1/2">
//                   <h3 className="text-2xl font-semibold mb-2 text-[#f4c95d]">{story.title}</h3>
//                   <p className="text-sm text-gray-400 mb-2 italic">{story.storyType}</p>
//                   <p className="text-gray-300 text-sm leading-relaxed mb-4">{preview}</p>
//                   <Link href={`/stories/${story._id}`}>
//                     <button className="bg-[#f4c95d] hover:bg-[#d9a944] text-black font-semibold py-2 px-4 rounded-md shadow-md transition duration-200">
//                       View Exhibit
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-400 text-2xl">No exhibits available at the moment. Please login to explore</p>
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
        const query = new URLSearchParams({ status: "approved" });
        if (selectedCategory) {
          query.append("category", selectedCategory);
        }

        const response = await fetch(`/api/stories?${query.toString()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.success) {
          const uniqueStories = {};
          const latestStories = [];

          for (const story of data.stories) {
            if (!uniqueStories[story.storyType]) {
              uniqueStories[story.storyType] = true;
              latestStories.push(story);
            }
            if (latestStories.length === 4) break;
          }

          setStories(latestStories);
        } else {
          setStories([]);
        }
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
    <div className="container mx-auto bg-[#1a1a1a] text-white font-serif pb-12">
      <HeroSection />
      <div className="text-center mb-8 mt-7">
        <h1 className="text-5xl font-bold text-[#f4c95d]">The Digital Museum of Untold Stories</h1>
        <p className="text-lg mt-3 text-gray-400 italic">Preserving history, one story at a time.</p>
      </div>

      {/* Museum Showcase Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-[400px] md:h-[500px] lg:h-[600px] shadow-lg"
      >
        {sections.map((section) => (
          <SwiperSlide key={section.name}>
            <Link href={`/stories?category=${encodeURIComponent(section.name)}`}>
              <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden">
                <img src={section.image} alt={section.name} className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-4xl font-bold text-[#f4c95d] drop-shadow-lg">{section.name}</h2>
                  <p className="text-lg mt-2 text-gray-300">{section.desc}</p>
                  <button className="mt-4 px-6 py-2 bg-[#f4c95d] text-black rounded-lg text-lg font-bold shadow-md hover:bg-[#d9a944]">Explore</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Stories */}
      <h2 className="text-4xl text-center font-bold mt-12 text-[#f4c95d]">Latest Exhibits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mt-8">
        {loading ? (
          <p className="text-center text-gray-400">Fetching historical artifacts...</p>
        ) : stories.length > 0 ? (
          stories.map((story) => {
            const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
            const preview = textContent.substring(0, 150) + "...";
            const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

            return (
              <div key={story._id} className="flex flex-col md:flex-row items-center bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="md:w-1/2 h-64">
                  <img src={imageUrl} alt={story.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-2 text-[#f4c95d]">{story.title}</h3>
                  <p className="text-sm text-gray-400 mb-2 italic">{story.storyType}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{preview}</p>
                  <Link href={`/stories/${story._id}`}>
                    <button className="bg-[#f4c95d] hover:bg-[#d9a944] text-black font-semibold py-2 px-4 rounded-md shadow-md transition duration-200">
                      View Exhibit
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 text-2xl">No exhibits available at the moment. Please login to explore</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;