// "use client";
// import { useState, useEffect } from "react";

// const AdminRoute = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await fetch(`/api/stories?status=pending`);
//         const data = await res.json();
//         setStories(data.stories);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       const method = action === "approve" ? "PUT" : "DELETE";
//       const res = await fetch(`/api/stories`, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ storyId: id, action }),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

//       // ✅ Story Approve/Reject hone ke baad remove karo
//       setStories(stories.filter((story) => story._id !== id));
//     } catch (error) {
//       console.error(`Error ${action}ing story:`, error);
//     }
//   };

//   return (
//     <div className="py-24">
//       <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
//       {stories.length === 0 ? (
//         <p className="text-center">No pending stories.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {stories.map((story) => (
//             <div key={story._id} className="p-4 border rounded-lg shadow-md bg-white">
//               <h2 className="text-xl font-semibold">{story.title}</h2>
//               <p className="text-gray-600">Type: {story.storyType}</p>

//               {/* ✅ Story Content (Read More Modal ya Expand Option) */}
//               <details className="mt-3">
//                 <summary className="cursor-pointer text-blue-500">Read More</summary>
//                 <div className="mt-2 space-y-2">
//                   {story.content.map((item, index) => (
//                     <div key={index} className="border p-2 rounded-md">
//                       {item.type === "text" ? (
//                         <p>{item.value}</p>
//                       ) : item.type === "image" ? (
//                         <img src={item.value} alt="Story Image" className="max-w-full h-auto" />
//                       ) : item.type === "video" ? (
//                         <video controls className="w-full">
//                           <source src={item.value} type="video/mp4" />
//                         </video>
//                       ) : item.type === "audio" ? (
//                         <audio controls>
//                           <source src={item.value} type="audio/mpeg" />
//                         </audio>
//                       ) : null}
//                     </div>
//                   ))}
//                 </div>
//               </details>

//               {/* ✅ Approve/Reject Buttons */}
//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={() => handleAction(story._id, "approve")}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleAction(story._id, "reject")}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                    Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminRoute;


"use client";
import { useState, useEffect } from "react";

const AdminRoute = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`/api/stories?status=pending`);
        const data = await res.json();
        setStories(data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const method = action === "approve" ? "PUT" : "DELETE";
      const res = await fetch(`/api/stories`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: id, action }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

      // ✅ Story Approve/Reject hone ke baad remove karo
      setStories(stories.filter((story) => story._id !== id));
    } catch (error) {
      console.error(`Error ${action}ing story:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 italic">
            Digital Museum of Untold Stories
          </p>
        </header>

        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-800 rounded-lg bg-gray-800/30 backdrop-blur">
            <p className="text-center text-gray-400">The archives currently hold no pending stories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div 
                key={story._id} 
                className="p-6 border border-gray-700 rounded-lg bg-gray-800/80 backdrop-blur shadow-lg hover:shadow-purple-900/20 transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-100">{story.title}</h2>
                <div className="mt-2 flex items-center">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                    {story.storyType}
                  </span>
                </div>

                {/* ✅ Story Content (Read More Modal ya Expand Option) */}
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-blue-400 hover:text-blue-300 flex items-center text-sm">
                    <span>View Artifact Contents</span>
                    <svg className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <div className="mt-3 space-y-3 border-t border-gray-700 pt-3 text-gray-300">
                    {story.content.map((item, index) => (
                      <div key={index} className="border border-gray-700 p-3 rounded-md bg-gray-800">
                        {item.type === "text" ? (
                          <p className="text-sm">{item.value}</p>
                        ) : item.type === "image" ? (
                          <div className="relative">
                            <img src={item.value} alt="Story Image" className="max-w-full h-auto rounded" />
                            <span className="absolute top-2 right-2 bg-black/50 text-xs px-2 py-1 rounded">Image</span>
                          </div>
                        ) : item.type === "video" ? (
                          <div className="relative">
                            <video controls className="w-full rounded">
                              <source src={item.value} type="video/mp4" />
                            </video>
                            <span className="absolute top-2 right-2 bg-black/50 text-xs px-2 py-1 rounded">Video</span>
                          </div>
                        ) : item.type === "audio" ? (
                          <div className="bg-gray-900 p-2 rounded">
                            <div className="text-xs text-gray-400 mb-1">Audio Recording</div>
                            <audio controls className="w-full">
                              <source src={item.value} type="audio/mpeg" />
                            </audio>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </details>

                {/* ✅ Approve/Reject Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleAction(story._id, "approve")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md flex-1 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(story._id, "reject")}
                    className="bg-rose-700 hover:bg-rose-600 text-white px-4 py-2 rounded-md flex-1 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRoute;