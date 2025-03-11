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

//     const response = await fetch("/api/stories", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       alert("Story submitted successfully!");
//       setFormData({ title: "", storyType: "", content: [] }); // Reset form after successful submission
//     } else {
//       alert("Error submitting story.");
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
//       <div className="max-w-3xl w-full p-6 rounded-xl shadow-lg bg-white space-y-6">
//         <h1 className="text-3xl font-bold text-center text-indigo-600">Tell Your Story</h1>

//         {/* Story Title Input */}
//         <input
//           type="text"
//           placeholder="Enter your story title..."
//           value={formData.title}
//           onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
//           className="w-full p-3 border rounded-md focus:border-indigo-500"
//           required
//         />

//         {/* Story Type Selection */}
//         <select
//           value={formData.storyType}
//           onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
//           className="p-3 border rounded-md w-full"
//         >
//           <option value="">Select Story Type</option>
//           {["Real-Life", "Folklore", "Myth", "Local Culture"].map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>

//         {/* Content List */}
//         <div className="space-y-4">
//           {formData.content.map((item, index) => (
//             <div key={index} className="relative p-4 bg-gray-50 border rounded-lg">
//               {/* Remove Button */}
//               <button
//                 onClick={() => removeContent(index)}
//                 className="absolute top-2 right-2 text-white px-3 py-2 rounded-full z-10"
//               >
//                 ❌
//               </button>

//               {/* Display Content Based on Type */}
//               {item.type === "text" ? (
//                 <textarea
//                   value={item.value}
//                   onChange={(e) => handleTextChange(index, e.target.value)}
//                   rows="3"
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Write your story..."
//                 />
//               ) : item.type === "image" ? (
//                 <img src={item.value} alt="Uploaded" className="w-full max-h-60 object-contain rounded-lg" />
//               ) : item.type === "video" ? (
//                 <video controls className="w-full max-h-60 rounded-lg">
//                   <source src={item.value} />
//                 </video>
//               ) : item.type === "audio" ? (
//                 <audio controls className="w-full">
//                   <source src={item.value} />
//                 </audio>
//               ) : null}
//             </div>
//           ))}
//         </div>

//         {/* Add Text Content Button */}
//         <button
//           onClick={() => addContent("text", "")}
//           className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
//         >
//           ➕ Add Text
//         </button>

//         {/* Cloudinary Upload Buttons for Media */}
//         <div className="flex flex-wrap gap-2">
//           {["image", "audio", "video"].map((type) => (
//             <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
//               {({ open }) => (
//                 <button
//                   type="button"
//                   onClick={() => open()}
//                   className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
//                 >
//                   📤 Upload {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </button>
//               )}
//             </CldUploadWidget>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="bg-yellow-400 text-black py-2 px-6 rounded-md w-full font-bold hover:bg-yellow-500"
//         >
//           🚀 Share Your Story
//         </button>
//       </div>
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
    // Add 'pending' status before sending to DB
    const storyData = { ...formData, status: "pending" };
  
    const response = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storyData), // Sending with status: "pending"
    });
  
    if (response.ok) {
      alert("Story submitted successfully and is pending approval!");
      setFormData({ title: "", storyType: "", content: [] }); // Reset form after successful submission
    } else {
      alert("Error submitting story.");
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full p-6 rounded-xl shadow-lg bg-white space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Tell Your Story</h1>

        {/* Story Title Input */}
        <input
          type="text"
          placeholder="Enter your story title..."
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full p-3 border rounded-md focus:border-indigo-500"
          required
        />

        {/* Story Type Selection */}
        <select
          value={formData.storyType}
          onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
          className="p-3 border rounded-md w-full"
        >
          <option value="">Select Story Type</option>
          {["Real-Life", "Folklore", "Myth", "Local Culture"].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Content List */}
        <div className="space-y-4">
          {formData.content.map((item, index) => (
            <div key={index} className="relative p-4 bg-gray-50 border rounded-lg">
              {/* Remove Button */}
              <button
                onClick={() => removeContent(index)}
                className="absolute top-2 right-2 text-white px-3 py-2 rounded-full z-10"
              >
                ❌
              </button>

              {/* Display Content Based on Type */}
              {item.type === "text" ? (
                <textarea
                  value={item.value}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  rows="3"
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your story..."
                />
              ) : item.type === "image" ? (
                <img src={item.value} alt="Uploaded" className="w-full max-h-60 object-contain rounded-lg" />
              ) : item.type === "video" ? (
                <video controls className="w-full max-h-60 rounded-lg">
                  <source src={item.value} />
                </video>
              ) : item.type === "audio" ? (
                <audio controls className="w-full">
                  <source src={item.value} />
                </audio>
              ) : null}
            </div>
          ))}
        </div>

        {/* Add Text Content Button */}
        <button
          onClick={() => addContent("text", "")}
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
        >
          ➕ Add Text
        </button>

        {/* Cloudinary Upload Buttons for Media */}
        <div className="flex flex-wrap gap-2">
          {["image", "audio", "video"].map((type) => (
            <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
                >
                  📤 Upload {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )}
            </CldUploadWidget>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black py-2 px-6 rounded-md w-full font-bold hover:bg-yellow-500"
        >
          🚀 Share Your Story
        </button>
      </div>
    </div>
  );
};

export default StorySubmission;

