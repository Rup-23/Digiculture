// "use client";
// import { useState } from "react";
// import { CldUploadWidget } from "next-cloudinary";

// const StorySubmission = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     storyType: "",
//     content: [],
//   });

//   const addContent = (type, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       content: [...prev.content, { type, value }],
//     }));
//   };

//   const handleTextChange = (index, value) => {
//     const updatedContent = [...formData.content];
//     updatedContent[index].value = value;
//     setFormData((prev) => ({ ...prev, content: updatedContent }));
//   };

//   const removeContent = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       content: prev.content.filter((_, i) => i !== index),
//     }));
//   };

//   const handleCloudinaryUpload = (result, mediaType) => {
//     if (result.event === "success") {
//       addContent(mediaType, result.info.secure_url);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.storyType || formData.content.length === 0) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     const storyData = { ...formData, status: "pending" };

//     const response = await fetch("/api/stories", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(storyData),
//     });

//     if (response.ok) {
//       alert("Story submitted successfully and is pending approval!");
//       setFormData({ title: "", storyType: "", content: [] });
//     } else {
//       alert("Error submitting story.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0f0d0e] text-[#e3c27e] py-28 px-6 flex flex-col items-center" 
//          style={{ backgroundImage: "url('/museum-texture.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
//       <h1 className="text-5xl font-extrabold text-center text-[#f5d061] mb-12 drop-shadow-md tracking-wide">📜 The Digital Museum of Untold Stories</h1>

//       <div className="w-full max-w-3xl bg-[#1c181a] p-8 rounded-xl shadow-2xl border border-[#f5d061] backdrop-blur-md">
//         <input
//           type="text"
//           placeholder="Enter your story title..."
//           value={formData.title}
//           onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
//           className="w-full text-2xl font-semibold bg-transparent border-b-2 border-[#f5d061] focus:outline-none p-3 mb-6 placeholder-[#e3c27e] text-[#e3c27e]"
//         />
//         <select
//           value={formData.storyType}
//           onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
//           className="w-full text-lg bg-[#2d2528] border border-[#f5d061] p-3 rounded-md text-[#e3c27e] font-medium shadow-sm"
//         >
//           <option value="">Select Story Type</option>
//           {["Real-Life", "Folklore", "Ancient Heritages", "Local Culture"].map((opt) => (
//             <option key={opt} value={opt}>{opt}</option>
//           ))}
//         </select>
//       </div>

//       <div className="w-full max-w-3xl mt-8 space-y-6">
//         {formData.content.map((item, index) => (
//           <div key={index} className="relative p-6 bg-[#33292b] border border-[#f5d061] rounded-lg shadow-md">
//             <button
//               onClick={() => removeContent(index)}
//               className="absolute top-2 right-2 text-[#f5d061] font-bold hover:text-red-500 transition duration-200"
//             >❌</button>
//             {item.type === "text" ? (
//               <textarea
//                 value={item.value}
//                 onChange={(e) => handleTextChange(index, e.target.value)}
//                 rows="6"
//                 className="w-full text-lg bg-transparent border-b-2 border-[#f5d061] focus:outline-none p-3 text-[#e3c27e] placeholder-[#e3c27e]"
//                 placeholder="Write your story..."
//               />
//             ) : item.type === "image" ? (
//               <img src={item.value} alt="Uploaded" className="w-full rounded-lg border border-[#f5d061] shadow-md" />
//             ) : item.type === "video" ? (
//               <video controls className="w-full rounded-lg border border-[#f5d061] shadow-md">
//                 <source src={item.value} />
//               </video>
//             ) : item.type === "audio" ? (
//               <audio controls className="w-full">
//                 <source src={item.value} />
//               </audio>
//             ) : null}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-4 flex-wrap mt-6">
//         <button onClick={() => addContent("text", "")} className="bg-[#f5d061] text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#e0b750] transition duration-200 shadow-md">
//           ➕ Add Text Section
//         </button>
//         {['image', 'audio', 'video'].map((type) => (
//           <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
//             {({ open }) => (
//               <button type="button" onClick={() => open()} className="bg-[#f5d061] text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#e0b750] transition duration-200 shadow-md">
//                 📤 Upload {type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             )}
//           </CldUploadWidget>
//         ))}
//       </div>

//       <button onClick={handleSubmit} className="mt-8 bg-[#f5d061] text-black py-4 px-8 rounded-lg text-xl font-bold w-full max-w-3xl hover:bg-[#e0b750] transition duration-200 shadow-lg">
//         🚀 Submit Your Story
//       </button>
//     </div>
//   );
// };

// export default StorySubmission;


"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const StorySubmission = () => {
  const [formData, setFormData] = useState({
    title: "",
    storyType: "",
    content: [],
  });

  const addContent = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { type, value }],
    }));
  };

  const handleTextChange = (index, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index].value = value;
    setFormData((prev) => ({ ...prev, content: updatedContent }));
  };

  const removeContent = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleCloudinaryUpload = (result, mediaType) => {
    if (result.event === "success") {
      addContent(mediaType, result.info.secure_url);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.storyType || formData.content.length === 0) {
      alert("Please fill all required fields.");
      return;
    }
    const storyData = { ...formData, status: "pending" };

    const response = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storyData),
    });

    if (response.ok) {
      alert("Story submitted successfully and is pending approval!");
      setFormData({ title: "", storyType: "", content: [] });
    } else {
      alert("Error submitting story.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#d4af37] mb-2">The Digital Museum of Untold Stories</h1>
          <p className="text-indigo-300 text-lg">Share your narrative with the world</p>
        </header>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-8">
            {/* Title Input */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">STORY TITLE</label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-700 border-0 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Story Type Selection */}
            <div className="mb-8">
              <label htmlFor="storyType" className="block text-sm font-medium text-gray-300 mb-2">CATEGORY</label>
              <select
                id="storyType"
                value={formData.storyType}
                onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
                className="w-full bg-gray-700 border-0 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {["Real-Life", "Folklore", "Ancient Heritages", "Local Culture"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            {/* Content Blocks */}
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-200">Content Blocks</h3>
                <div className="h-px bg-gray-700 flex-grow ml-4"></div>
              </div>
              
              {formData.content.length === 0 && (
                <div className="bg-gray-750 border border-gray-600 rounded-lg p-8 text-center">
                  <p className="text-gray-400">
                    No content added yet. Use the buttons below to build your story.
                  </p>
                </div>
              )}
              
              {formData.content.map((item, index) => (
                <div key={index} className="bg-gray-750 rounded-lg border border-gray-600 overflow-hidden">
                  <div className="flex justify-between items-center bg-gray-700 px-4 py-3">
                    <span className="font-medium text-gray-200">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Block
                    </span>
                    <button
                      onClick={() => removeContent(index)}
                      className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                      aria-label="Remove content"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    {item.type === "text" ? (
                      <textarea
                        value={item.value}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                        rows="6"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Write your story content here..."
                      />
                    ) : item.type === "image" ? (
                      <div className="flex justify-center">
                        <img src={item.value} alt="Uploaded" className="max-h-96 rounded-lg" />
                      </div>
                    ) : item.type === "video" ? (
                      <div className="flex justify-center">
                        <video controls className="max-w-full rounded-lg">
                          <source src={item.value} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : item.type === "audio" ? (
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <audio controls className="w-full">
                          <source src={item.value} />
                          Your browser does not support the audio tag.
                        </audio>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Content Actions */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-200">Add Content</h3>
                <div className="h-px bg-gray-700 flex-grow ml-4"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button 
                  onClick={() => addContent("text", "")} 
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Text
                </button>
                
                {['image', 'audio', 'video'].map((type) => (
                  <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
                    {({ open }) => (
                      <button 
                        type="button" 
                        onClick={() => open()} 
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {type === 'image' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {type === 'audio' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                          </svg>
                        )}
                        {type === 'video' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        )}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )}
                  </CldUploadWidget>
                ))}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-2">
              <button 
                onClick={handleSubmit} 
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Submit Your Story
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>All submissions are reviewed before publication. Thank you for contributing to our digital collection.</p>
        </footer>
      </div>
    </div>
  );
};

export default StorySubmission;


