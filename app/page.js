"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSection from "../components/HeroSection";

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
        setStories(data.slice(0, 5)); // Sirf 5 latest stories dikhani hain
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

    fetchStories();
  }, []);

  const sections = [
    { name: "Folklore", image: "/img4.jpg" },
    { name: "Myth", image: "/img5.jpg" },
    { name: "Real-Life", image: "/img7.jpg" },
    { name: "Local Culture", image: "/img9.jpg" },
  ];

  return (
    <div className="container mx-auto">
      <HeroSection />
      <div className="text-center mb-8 mt-7">
        <h1 className="text-4xl font-bold">Welcome to the Story Hub</h1>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mb-8 p-5">
        {sections.map((section) => (
          <Link key={section.name} href={`/stories?category=${section.name}`}>
            <div className="cursor-pointer text-center">
              <img
                src={section.image}
                alt={section.name}
                className="w-full h-44 object-fill rounded-lg"
              />
              <h2 className="mt-2 font-semibold text-lg">{section.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Latest Stories */}
      <h2 className="text-3xl text-center font-bold mb-4 ml-5">Latest Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="border p-4 rounded-lg shadow-lg">
            {/* Image Fix: Ensure correct image URL is used */}
            {story.imageUrl && story.imageUrl.split(",")[0] && (
              <img
                src={story.imageUrl.split(",")[0].trim()}
                alt={story.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <h3 className="mt-2 text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-600">
              {story.description.substring(0, 100)}...
            </p>
            <Link href={`/stories/${story._id}`}>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Read More
              </button>
            </Link>      
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;





(3000, '0.0.0.0', () => {
  console.log('Server running on 0.0.0.0:3000');
});





