// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// // Create a cache for stories to avoid repeated fetches
// const storiesCache = {
//   data: {},
//   timestamp: {},
//   ttl: 5 * 60 * 1000, // 5 minutes cache TTL
// };

// const Stories = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");
//   const cacheKey = category || 'all';

//   useEffect(() => {
//     async function fetchStories() {
//       setLoading(true);
      
//       // Check if we have valid cached data
//       const now = Date.now();
//       if (
//         storiesCache.data[cacheKey] &&
//         now - storiesCache.timestamp[cacheKey] < storiesCache.ttl
//       ) {
//         setStories(storiesCache.data[cacheKey]);
//         setLoading(false);
//         return;
//       }

//       try {
//         let url = "/api/stories?status=approved";
//         if (category) {
//           url += `&category=${encodeURIComponent(category)}`;
//         }

//         const response = await fetch(url, { next: { revalidate: 3600 } });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         const storiesData = data.success && Array.isArray(data.stories) ? data.stories : [];
        
//         // Update the cache
//         storiesCache.data[cacheKey] = storiesData;
//         storiesCache.timestamp[cacheKey] = now;
        
//         setStories(storiesData);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//         setStories([]);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchStories();
//   }, [category, cacheKey]);

//   return (
//     <div className="min-h-screen bg-[#1a1a1a] py-24 px-4" 
//          style={{
//            backgroundImage: `url('/museum-texture-dark.jpg')`,
//            backgroundSize: 'cover',
//            backgroundAttachment: 'fixed',
//            backgroundBlendMode: 'overlay'
//          }}>
//       <div className="max-w-7xl mx-auto">
//         {/* Museum-like header */}
//         <header className="mb-16 text-center">
//           <div className="inline-block">
//             <h1 className="text-5xl font-serif font-bold text-amber-300 mb-4">
//               {category ? `${category} Collection` : "Digital Museum of Untold Stories"}
//             </h1>
//             <div className="h-1 w-32 bg-amber-400 mx-auto"></div>
//           </div>
//           {!category && (
//             <p className="mt-6 text-amber-200 text-xl max-w-2xl mx-auto font-serif italic">
//               Explore our curated collection of cultural narratives and personal histories
//             </p>
//           )}
          
          
//           <div className="mt-10 flex flex-wrap justify-center gap-3">
//             <CategoryLink current={category} category={null} label="All Stories" />
//             <CategoryLink current={category} category="Real-Life" label="Real-Life" />
//             <CategoryLink current={category} category="Folklore" label="Folklore" />
//             <CategoryLink current={category} category="Ancient Heritages" label="Ancient Heritages" />
//             <CategoryLink current={category} category="Local Culture" label="Local Culture" />
//           </div>
//         </header>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-amber-300 text-xl font-serif">Curating exhibits...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//             {stories.length > 0 ? (
//               stories.map((story) => {
//                 const textContent =
//                   story.content?.find((item) => item.type === "text")?.value || "No preview available.";
//                 const preview = textContent.substring(0, 120) + "...";
//                 const imageUrl =
//                   story.content?.find((item) => item.type === "image")?.value || "/default-story.jpg";

//                 return (
//                   <article
//                     key={story._id}
//                     className="group flex flex-col rounded-lg overflow-hidden bg-stone-800 border border-amber-900/30 shadow-xl transition-all duration-500 hover:shadow-amber-900/30 hover:shadow-2xl"
//                   >
//                     {/* Story Image with Frame Effect */}
//                     <div className="relative overflow-hidden h-64 border-b border-amber-900/30">
//                       <div className="absolute inset-0 border-2 border-amber-800/20 m-2 z-10 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
//                       <img
//                         src={imageUrl}
//                         alt={story.title}
//                         className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//                         loading="lazy"
//                       />
//                       <div className="absolute top-3 right-3 bg-amber-800/80 text-amber-100 text-xs px-3 py-1 rounded-full font-medium">
//                         {story.storyType}
//                       </div>
//                     </div>
                    
//                     {/* Story Content */}
//                     <div className="flex flex-col flex-grow p-5">
//                       <h2 className="text-2xl font-serif font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors line-clamp-2">
//                         {story.title}
//                       </h2>
                      
//                       <p className="text-amber-100/80 mb-5 line-clamp-3 text-sm flex-grow">
//                         {preview}
//                       </p>
                      
//                       <Link 
//                         href={`/stories/${story._id}`}
//                         className="relative z-10 self-end mt-auto"
//                       >
//                         <button className="bg-amber-800/50 hover:bg-amber-700 text-amber-100 font-medium py-2 px-5 rounded border border-amber-700/50 hover:border-amber-600 transition-all duration-300 flex items-center space-x-1 group">
//                           <span>View Exhibit</span>
//                           <svg 
//                             xmlns="http://www.w3.org/2000/svg" 
//                             className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
//                             fill="none" 
//                             viewBox="0 0 24 24" 
//                             stroke="currentColor"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                           </svg>
//                         </button>
//                       </Link>
//                     </div>
//                   </article>
//                 );
//               })
//             ) : (
//               <div className="col-span-full flex flex-col items-center justify-center py-20">
//                 <div className="w-24 h-24 rounded-full bg-amber-800/30 flex items-center justify-center mb-6">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-serif text-amber-300 mb-2">No Exhibits Found</h3>
//                 <p className="text-amber-100/70 text-center max-w-md">
//                   There are currently no stories in this collection. Please check back later or explore other categories.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
        
//         {/* Museum Footer Note */}
//         <div className="mt-16 text-center">
//           <p className="text-amber-200/50 text-sm italic font-serif">
//             Our museum is constantly expanding with new stories from around the world.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Category Link Component
// function CategoryLink({ current, category, label }) {
//   const isActive = 
//     (category === null && current === null) || 
//     (category !== null && current === category);
  
//   const href = category ? `/stories?category=${encodeURIComponent(category)}` : '/stories';
  
//   return (
//     <Link href={href}>
//       <span className={`
//         px-4 py-2 rounded-full text-sm transition-all duration-300
//         ${isActive 
//           ? 'bg-amber-700 text-amber-100 shadow-lg' 
//           : 'bg-stone-800/80 text-amber-300/70 hover:bg-stone-700 hover:text-amber-200'}
//       `}>
//         {label}
//       </span>
//     </Link>
//   );
// }

// export default Stories;

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
    <div className="min-h-screen bg-stone-900 py-36 px-4" 
         style={{
           backgroundImage: `url('/museum-texture-dark.jpg')`,
           backgroundSize: 'cover',
           backgroundAttachment: 'fixed',
           backgroundBlendMode: 'multiply'
         }}>
      <div className="max-w-7xl mx-auto">
        {/* Museum entrance and nameplate */}
        <header className="mb-16">
          <div className="relative mb-8">
            {/* Museum logo/symbol */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-amber-900/30 rounded-full flex items-center justify-center border-4 border-amber-900/40">
                <div className="w-20 h-20 bg-amber-800/40 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Museum name plate */}
            <div className="mx-auto max-w-3xl bg-stone-800 border-2 border-amber-900/60 shadow-lg text-center p-6 pt-12">
              <h1 className="text-4xl font-serif font-bold text-amber-200 mb-4">
                {category ? `${category} Exhibition` : "Digital Museum of Untold Stories"}
              </h1>
              
              <div className="h-px w-full bg-amber-700/60 mx-auto mb-4"></div>
              
              {!category && (
                <p className="text-amber-100/80 text-lg max-w-2xl mx-auto font-serif italic">
                  Preserving and exhibiting cultural narratives from across time and place
                </p>
              )}
            </div>
          </div>
          
          {/* Museum directory board */}
          <div className="mx-auto max-w-2xl bg-stone-800 border border-stone-700 p-4 shadow-md">
            <div className="flex items-center justify-center mb-3">
              <div className="h-px w-8 bg-amber-700"></div>
              <div className="text-amber-300 text-sm uppercase tracking-widest px-3 font-medium">Museum Directory</div>
              <div className="h-px w-8 bg-amber-700"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-center">
              <CategoryLink current={category} category={null} label="Main Exhibition Hall" />
              <CategoryLink current={category} category="Real-Life" label="Real-Life Gallery" />
              <CategoryLink current={category} category="Folklore" label="Folklore Wing" />
              <CategoryLink current={category} category="Ancient Heritages" label="Ancient Artifacts" />
              <CategoryLink current={category} category="Local Culture" label="Cultural Heritage" />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-amber-300 text-xl font-serif">Preparing exhibition...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {stories.length > 0 ? (
              stories.map((story) => {
                const textContent =
                  story.content?.find((item) => item.type === "text")?.value || "No description available.";
                const preview = textContent.substring(0, 120) + "...";
                const imageUrl =
                  story.content?.find((item) => item.type === "image")?.value || "/default-story.jpg";

                return (
                  <div
                    key={story._id}
                    className="group bg-stone-900 transition-all duration-500 hover:shadow-amber-900/40 hover:shadow-2xl"
                  >
                    {/* Museum display case */}
                    <div className="relative bg-stone-800 p-3 pb-6">
                      {/* Exhibit label */}
                      <div className="absolute -top-3 left-4 bg-amber-900 text-amber-100 text-xs px-3 py-1 z-10 font-medium tracking-wider">
                        {story.storyType}
                      </div>
                      
                      {/* Museum case with visible joints */}
                      <div className="relative border-t-4 border-l-4 border-r-4 border-b-8 border-stone-700 pt-4">
                        {/* Spotlight effect */}
                        <div className="absolute inset-0 shadow-inner z-10 pointer-events-none 
                                       bg-radial-gradient from-transparent to-black/30"></div>
                        
                        {/* Exhibit lighting */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-300/20 blur-sm"></div>
                        
                        <img
                          src={imageUrl}
                          alt={story.title}
                          className="w-full h-56 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Museum information plaque */}
                    <div className="px-6 py-5 bg-stone-900 border-l border-r border-b border-amber-900/30">
                      {/* Artifact number */}
                      <div className="mb-2 text-xs text-amber-500/70 font-mono">ARTIFACT #{story._id.substring(story._id.length - 5)}</div>
                      
                      {/* Title plate */}
                      <div className="bg-amber-900/10 border-l-4 border-amber-700 pl-3 py-2 mb-4">
                        <h2 className="text-xl font-serif font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                          {story.title}
                        </h2>
                      </div>
                      
                      {/* Description card */}
                      <div className="bg-stone-800/50 p-3 mb-4 border-l border-amber-900/20">
                        <p className="text-amber-100/70 text-sm font-serif">
                          {preview}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        {/* Date stamp */}
                        <div className="text-amber-400/50 text-xs">
                          On display since {new Date().getFullYear()}
                        </div>
                        
                        {/* Audio guide button */}
                        <Link 
                          href={`/stories/${story._id}`}
                          className="relative z-10"
                        >
                          <button className="bg-stone-800 hover:bg-amber-900 text-amber-200 font-medium py-2 px-4 flex items-center space-x-2 group shadow-md border-b-2 border-amber-700/50 transition-all duration-300">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>View Artifact</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                {/* Museum construction sign */}
                <div className="w-full max-w-lg bg-stone-800 border-2 border-amber-900/30">
                  {/* Sign header */}
                  <div className="bg-amber-900 text-amber-100 py-2 px-4 text-center font-serif">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 className="text-xl font-bold uppercase tracking-wider">Gallery Under Renovation</h3>
                  </div>
                  
                  {/* Sign content */}
                  <div className="p-6 text-center">
                    <div className="flex justify-center items-center mb-4">
                      <div className="w-16 h-px bg-amber-700/50"></div>
                      <div className="px-4 text-amber-400 font-serif text-lg">Notice</div>
                      <div className="w-16 h-px bg-amber-700/50"></div>
                    </div>
                    
                    <p className="text-amber-100/80 mb-6 font-serif">
                      Our curators are currently preparing new artifacts for this exhibition hall. 
                      We apologize for any inconvenience.
                    </p>
                    
                    <div className="text-amber-300/70 font-mono text-sm border-t border-amber-900/20 pt-4">
                      Please visit our other exhibition areas or return at a later date.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
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
      <div className={`
        transition-all duration-300 py-2 px-3 text-center border 
        ${isActive 
          ? 'bg-amber-900/50 text-amber-100 border-amber-700' 
          : 'bg-stone-900/40 text-amber-300/80 hover:bg-stone-700 border-stone-700 hover:border-amber-800 hover:text-amber-200'}
      `}>
        <div className="text-xs font-mono mb-1">
          {isActive ? "CURRENTLY VIEWING" : "GALLERY"}
        </div>
        <div className="font-serif">
          {label}
        </div>
      </div>
    </Link>
  );
}

export default Stories;