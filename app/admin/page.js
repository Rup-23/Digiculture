// import { redirect } from 'next/navigation'
// import { checkRole } from '@/utils/role'
// import React from 'react'


// const AdminRoute = async () => {

//   // Protect the page from users who are not admins
//   const isAdmin = await checkRole('digi_culture')
//   if (!isAdmin) {
//     redirect('/')
//   }

//   return (
//     <div className='py-20 text-center'>
//       <h1 className='text-black text-4xl'>Only Admin can access this page</h1>
//       </div>
//   )
// }

// export default AdminRoute




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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      {stories.length === 0 ? (
        <p className="text-center">No pending stories.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-gray-600">Type: {story.storyType}</p>

              {/* ✅ Story Content (Read More Modal ya Expand Option) */}
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-500">Read More</summary>
                <div className="mt-2 space-y-2">
                  {story.content.map((item, index) => (
                    <div key={index} className="border p-2 rounded-md">
                      {item.type === "text" ? (
                        <p>{item.value}</p>
                      ) : item.type === "image" ? (
                        <img src={item.value} alt="Story Image" className="max-w-full h-auto" />
                      ) : item.type === "video" ? (
                        <video controls className="w-full">
                          <source src={item.value} type="video/mp4" />
                        </video>
                      ) : item.type === "audio" ? (
                        <audio controls>
                          <source src={item.value} type="audio/mpeg" />
                        </audio>
                      ) : null}
                    </div>
                  ))}
                </div>
              </details>

              {/* ✅ Approve/Reject Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleAction(story._id, "approve")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(story._id, "reject")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                   Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRoute;
