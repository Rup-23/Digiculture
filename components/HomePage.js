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
//         if (data.success) {
//           const uniqueStories = {};
//           const latestStories = [];

//           for (const story of data.stories) {
//             if (!uniqueStories[story.storyType]) {
//               uniqueStories[story.storyType] = true;
//               latestStories.push(story);
//             }
//             if (latestStories.length === 4) break;
//           }

//           setStories(latestStories);
//         } else {
//           setStories([]);
//         }
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
//     { name: "Folklore", image: "/img10.jpg", desc: "Tales from the past, passed down through generations." },
//     { name: "Myth", image: "/img4.jpg", desc: "Legends, gods, and the mystical elements that shape our beliefs." },
//     { name: "Real-Life", image: "/img7.jpg", desc: "True stories of ordinary people doing extraordinary things." },
//     { name: "Local Culture", image: "/img9.jpg", desc: "Traditions, rituals, and customs that define a community." },
//   ];

//   return (
//     <div className="container mx-auto bg-[#1a1a1a] text-white font-serif pb-12">
//       <HeroSection />
//       <div className="text-center mb-8 mt-7">
//         <h1 className="text-5xl font-bold text-[#f4c95d]">The Digital Museum of Untold Stories</h1>
//         <p className="text-2xl mt-3 text-gray-400 italic">Preserving history, one story at a time.</p>
//       </div>

//       {/* Introductory Text */}
//       <div className="text-center mb-12 px-6">
//         <p className="text-lg ml-2 mr-2 text-gray-300 text-justify">
//           Welcome to the Digital Museum of Untold Stories, a platform dedicated to sharing and preserving the myths, folklore, and real-life experiences that shape our diverse cultures. 
//           Here, anyone can contribute their personal stories, local traditions, or ancient legends, ensuring that these narratives are never forgotten. Join us in preserving history, one story at a time.History is often written in books, but the most powerful stories often go untold. This is a place for those stories – the ones that are passed down through generations, the stories that shape our communities, and the narratives that are left behind in the shadows of mainstream media. Here, every story matters. Whether it's a tale of mythical creatures or the real struggles of everyday life, we preserve them, cherish them, and share them with the world
//         </p>
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

//       {/* Latest Stories Section */}
//       <h2 className="text-4xl text-center font-bold mt-12 text-[#f4c95d]">Latest Exhibits</h2>
//       <div className="text-center mb-8 px-6 text-lg text-gray-300">
//         <p className="text-justify text-lg ml-2 mr-2 mt-11 text-gray-300">
//           Explore our latest collection of exhibits, ranging from ancient folklore to real-life stories that have shaped the communities around us. These exhibits represent the diversity and richness of untold narratives.Our latest exhibits are a collection of voices that have been waiting to be heard. These stories are not just words on a page – they are the lived experiences of individuals, woven into narratives that inspire, teach, and move us. Each one is a window into a different world, and we invite you to explore them."
//           As we gather and preserve these stories, we hope to create a space where people from all walks of life can share their truths, connect with one another, and learn from each other. This is not just a museum – it’s a living, breathing testament to the power of storytelling.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mt-8">
//         {loading ? (
//           <p className="text-center text-gray-400">Fetching historical artifacts...</p>
//         ) : stories.length > 0 ? (
//           stories.map((story) => {
//             const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
//             const preview = textContent.substring(0, 150) + "...";
//             const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

//             return (
//               <div key={story._id} className="relative bg-[#222] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
//                 <img src={imageUrl} alt={story.title} className="w-full h-96 object-cover opacity-90" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
//                   <h3 className="text-3xl font-semibold text-[#f4c95d] mb-2">{story.title}</h3>
//                   <p className="text-sm text-gray-400 italic mb-2">{story.storyType}</p>
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
    { name: "Folklore", image: "/img10.jpg", desc: "Tales from the past, passed down through generations." },
    { name: "Myth", image: "/img4.jpg", desc: "Legends, gods, and the mystical elements that shape our beliefs." },
    { name: "Real-Life", image: "/img7.jpg", desc: "True stories of ordinary people doing extraordinary things." },
    { name: "Local Culture", image: "/img9.jpg", desc: "Traditions, rituals, and customs that define a community." },
  ];

  return (
    <div className="container mx-auto bg-[#1a1a1a] text-white font-serif pb-12">
      <HeroSection />
      <div className="text-center mb-6 sm:mb-8 mt-5 sm:mt-7 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f4c95d]">The Digital Museum of Untold Stories</h1>
        <p className="text-xl sm:text-2xl mt-2 sm:mt-3 text-gray-400 italic">Preserving history, one story at a time.</p>
      </div>

      {/* Introductory Text */}
      <div className="text-center mb-8 sm:mb-12 px-4 sm:px-6">
        <p className="text-base sm:text-lg text-gray-300 text-justify mx-0 sm:mx-2">
          Welcome to the Digital Museum of Untold Stories, a platform dedicated to sharing and preserving the myths, folklore, and real-life experiences that shape our diverse cultures. 
          Here, anyone can contribute their personal stories, local traditions, or ancient legends, ensuring that these narratives are never forgotten. Join us in preserving history, one story at a time.History is often written in books, but the most powerful stories often go untold. This is a place for those stories – the ones that are passed down through generations, the stories that shape our communities, and the narratives that are left behind in the shadows of mainstream media. Here, every story matters. Whether it's a tale of mythical creatures or the real struggles of everyday life, we preserve them, cherish them, and share them with the world
        </p>
      </div>

      {/* Museum Showcase Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] shadow-lg"
      >
        {sections.map((section) => (
          <SwiperSlide key={section.name}>
            <Link href={`/stories?category=${encodeURIComponent(section.name)}`}>
              <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden">
                <img src={section.image} alt={section.name} className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f4c95d] drop-shadow-lg">{section.name}</h2>
                  <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-300">{section.desc}</p>
                  <button className="mt-3 sm:mt-4 px-4 sm:px-6 py-1 sm:py-2 bg-[#f4c95d] text-black rounded-lg text-base sm:text-lg font-bold shadow-md hover:bg-[#d9a944]">Explore</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Stories Section */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mt-8 sm:mt-12 text-[#f4c95d]">Latest Exhibits</h2>
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6">
        <p className="text-justify text-base sm:text-lg mt-6 sm:mt-11 text-gray-300 mx-0 sm:mx-2">
          Explore our latest collection of exhibits, ranging from ancient folklore to real-life stories that have shaped the communities around us. These exhibits represent the diversity and richness of untold narratives.Our latest exhibits are a collection of voices that have been waiting to be heard. These stories are not just words on a page – they are the lived experiences of individuals, woven into narratives that inspire, teach, and move us. Each one is a window into a different world, and we invite you to explore them."
          As we gather and preserve these stories, we hope to create a space where people from all walks of life can share their truths, connect with one another, and learn from each other. This is not just a museum – it's a living, breathing testament to the power of storytelling.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-6 mt-6 sm:mt-8">
        {loading ? (
          <p className="text-center text-gray-400">Fetching historical artifacts...</p>
        ) : stories.length > 0 ? (
          stories.map((story) => {
            const textContent = story.content.find((item) => item.type === "text")?.value || "No preview available.";
            const preview = textContent.substring(0, 150) + "...";
            const imageUrl = story.content.find((item) => item.type === "image")?.value || "/default-story.jpg";

            return (
              <div key={story._id} className="relative bg-[#222] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
                <img src={imageUrl} alt={story.title} className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#f4c95d] mb-1 sm:mb-2">{story.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 italic mb-1 sm:mb-2">{story.storyType}</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4">{preview}</p>
                  <Link href={`/stories/${story._id}`}>
                    <button className="bg-[#f4c95d] hover:bg-[#d9a944] text-black font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-md shadow-md transition duration-200 text-sm sm:text-base">
                      View Exhibit
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 text-xl sm:text-2xl">No exhibits available at the moment. Please login to explore</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;