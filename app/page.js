"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch("/api/stories", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data.slice(0, 5)); // Show only the latest 5 stories
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

    fetchStories();
  }, []);

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
            <Link href={`/stories?category=${section.name}`}>
              <div className="relative w-full h-full cursor-pointer">
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
                  <h2 className="text-3xl font-bold">{section.name}</h2>
                  <p className="text-lg mt-2">{section.desc}</p>
                  <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Latest Stories */}
      <h2 className="text-3xl text-center font-bold mb-4 ml-5">Latest Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story._id} className="border p-4 rounded-lg shadow-lg">
              {story.imageUrl && typeof story.imageUrl === "string" && story.imageUrl.includes(",") ? (
                <img
                  src={story.imageUrl.split(",")[0].trim()}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <img
                  src="/default-story.jpg" // Fallback image
                  alt="Default Story"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <h3 className="mt-2 text-xl font-semibold">{story.title}</h3>
              <p className="text-gray-600">
                {story.description ? story.description.substring(0, 100) : "No description available"}...
              </p>
              <Link href={`/stories/${story._id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Read More
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No stories available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
