
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
    <div className="min-h-screen bg-[#1a1a1a] py-24 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gold mb-10 border-b-2 border-gold pb-4">
          {category ? `${category} Stories` : "The Digital Museum of Stories"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="relative bg-[#2b2b2b] rounded-lg shadow-xl border border-[#8a6d3b] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="h-64 overflow-hidden border-b border-[#8a6d3b]">
                    <img
                      src={imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gold truncate">
                      {story.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#d1a354] mb-2 uppercase">
                      {story.storyType}
                    </p>
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      {preview}
                    </p>
                    <Link href={`/stories/${story._id}`}>
                      <button className="w-full bg-[#8a6d3b] hover:bg-[#a07f4e] text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 text-lg font-medium">
              No stories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;
