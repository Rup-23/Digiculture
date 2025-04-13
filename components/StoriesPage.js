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

        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setStories(data.success && Array.isArray(data.stories) ? data.stories : []);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      }
    }
    fetchStories();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#121212] py-24 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-[#f4c17a] mb-12 border-b-4 border-[#f4c17a] pb-6 tracking-widest drop-shadow-lg">
          {category ? `${category} Stories` : "The Digital Museum of Untold Stories"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {stories.length > 0 ? (
            stories.map((story) => {
              const textContent =
                story.content?.find((item) => item.type === "text")?.value || "No preview available.";
              const preview = textContent.substring(0, 150) + "...";
              const imageUrl =
                story.content?.find((item) => item.type === "image")?.value || "/default-story.jpg";

              return (
                <div
                  key={story._id}
                  className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-[#1a1a1a] border border-[#f4c17a]/50 hover:border-[#f4c17a]/80"
                >
                  {/* Story Image */}
                  <div className="relative group">
                    <img
                      src={imageUrl}
                      alt={story.title}
                      className="w-full h-96 object-cover transition-opacity duration-500 group-hover:opacity-30"
                      loading="lazy"
                    />

                    {/* Hidden Content (Reveals on Hover) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                      <h3 className="text-3xl font-bold text-[#f4c17a] drop-shadow-lg">{story.title}</h3>
                      <p className="text-lg font-semibold text-[#e2af5a] mb-2 uppercase tracking-wider">
                        {story.storyType}
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">{preview}</p>
                      <Link href={`/stories/${story._id}`}>
                        <button className="bg-[#f4c17a] text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#e2af5a] transition-transform duration-200 hover:scale-105">
                          Read More →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 text-3xl font-medium tracking-wide italic">
          Plese wait loading the stories... 
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;
