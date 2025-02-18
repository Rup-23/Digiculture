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
        let url = "/api/stories";
        if (category) {
          url += `?category=${category}`;
        }

        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

    fetchStories();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 py-20"> {/* Match the original styling */}
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800"> {/* Match the original styling */}
        {category ? `${category} Stories` : "All Stories"}
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4"> {/* Match the original grid */}
        {stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105" // Match card styling
            >
              {story.imageUrl && story.imageUrl.split(",")[0] && (
                <img
                  src={story.imageUrl.split(",")[0].trim()}
                  alt={story.title}
                  className="w-full h-48 object-cover" // Match image styling
                />
              )}

              <div className="p-5"> {/* Match padding */}
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full"> {/* Match category tag styling */}
                  {story.storyType} {/* Assuming you have storyType in your data */}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-gray-900"> {/* Match title styling */}
                  {story.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-3"> {/* Match description styling and line-clamp */}
                  {story.description}
                </p>

                <Link href={`/stories/${story._id}`}> {/* Keep the original link path */}
                  <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"> {/* Match button styling */}
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg"> {/* Match "No stories found" styling */}
            No stories found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stories;

