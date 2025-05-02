"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Create a cache for stories to avoid repeated fetches
const storiesCache = {
  data: {},
  timestamp: {},
  ttl: 5 * 60 * 1000, // 5 minutes cache TTL
};

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const cacheKey = category || 'all';

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      
      // Check if we have valid cached data
      const now = Date.now();
      if (
        storiesCache.data[cacheKey] &&
        now - storiesCache.timestamp[cacheKey] < storiesCache.ttl
      ) {
        setStories(storiesCache.data[cacheKey]);
        setLoading(false);
        return;
      }

      try {
        let url = "/api/stories?status=approved";
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }

        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const storiesData = data.success && Array.isArray(data.stories) ? data.stories : [];
        
        // Update the cache
        storiesCache.data[cacheKey] = storiesData;
        storiesCache.timestamp[cacheKey] = now;
        
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStories();
  }, [category, cacheKey]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-24 px-4" 
         style={{
           backgroundImage: `url('/museum-texture-dark.jpg')`,
           backgroundSize: 'cover',
           backgroundAttachment: 'fixed',
           backgroundBlendMode: 'overlay'
         }}>
      <div className="max-w-7xl mx-auto">
        {/* Museum-like header */}
        <header className="mb-16 text-center">
          <div className="inline-block">
            <h1 className="text-5xl font-serif font-bold text-amber-300 mb-4">
              {category ? `${category} Collection` : "Digital Museum of Untold Stories"}
            </h1>
            <div className="h-1 w-32 bg-amber-400 mx-auto"></div>
          </div>
          {!category && (
            <p className="mt-6 text-amber-200 text-xl max-w-2xl mx-auto font-serif italic">
              Explore our curated collection of cultural narratives and personal histories
            </p>
          )}
          
          
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CategoryLink current={category} category={null} label="All Stories" />
            <CategoryLink current={category} category="Real-Life" label="Real-Life" />
            <CategoryLink current={category} category="Folklore" label="Folklore" />
            <CategoryLink current={category} category="Ancient Heritages" label="Ancient Heritages" />
            <CategoryLink current={category} category="Local Culture" label="Local Culture" />
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-amber-300 text-xl font-serif">Curating exhibits...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {stories.length > 0 ? (
              stories.map((story) => {
                const textContent =
                  story.content?.find((item) => item.type === "text")?.value || "No preview available.";
                const preview = textContent.substring(0, 120) + "...";
                const imageUrl =
                  story.content?.find((item) => item.type === "image")?.value || "/default-story.jpg";

                return (
                  <article
                    key={story._id}
                    className="group flex flex-col rounded-lg overflow-hidden bg-stone-800 border border-amber-900/30 shadow-xl transition-all duration-500 hover:shadow-amber-900/30 hover:shadow-2xl"
                  >
                    {/* Story Image with Frame Effect */}
                    <div className="relative overflow-hidden h-64 border-b border-amber-900/30">
                      <div className="absolute inset-0 border-2 border-amber-800/20 m-2 z-10 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
                      <img
                        src={imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-amber-800/80 text-amber-100 text-xs px-3 py-1 rounded-full font-medium">
                        {story.storyType}
                      </div>
                    </div>
                    
                    {/* Story Content */}
                    <div className="flex flex-col flex-grow p-5">
                      <h2 className="text-2xl font-serif font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors line-clamp-2">
                        {story.title}
                      </h2>
                      
                      <p className="text-amber-100/80 mb-5 line-clamp-3 text-sm flex-grow">
                        {preview}
                      </p>
                      
                      <Link 
                        href={`/stories/${story._id}`}
                        className="relative z-10 self-end mt-auto"
                      >
                        <button className="bg-amber-800/50 hover:bg-amber-700 text-amber-100 font-medium py-2 px-5 rounded border border-amber-700/50 hover:border-amber-600 transition-all duration-300 flex items-center space-x-1 group">
                          <span>View Exhibit</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-amber-800/30 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-amber-300 mb-2">No Exhibits Found</h3>
                <p className="text-amber-100/70 text-center max-w-md">
                  There are currently no stories in this collection. Please check back later or explore other categories.
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Museum Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-amber-200/50 text-sm italic font-serif">
            Our museum is constantly expanding with new stories from around the world.
          </p>
        </div>
      </div>
    </div>
  );
};

// Category Link Component
function CategoryLink({ current, category, label }) {
  const isActive = 
    (category === null && current === null) || 
    (category !== null && current === category);
  
  const href = category ? `/stories?category=${encodeURIComponent(category)}` : '/stories';
  
  return (
    <Link href={href}>
      <span className={`
        px-4 py-2 rounded-full text-sm transition-all duration-300
        ${isActive 
          ? 'bg-amber-700 text-amber-100 shadow-lg' 
          : 'bg-stone-800/80 text-amber-300/70 hover:bg-stone-700 hover:text-amber-200'}
      `}>
        {label}
      </span>
    </Link>
  );
}

export default Stories;