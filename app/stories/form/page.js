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
    <div className="min-h-screen bg-[#0f0d0e] text-[#e3c27e] py-28 px-6 flex flex-col items-center" 
         style={{ backgroundImage: "url('/museum-texture.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <h1 className="text-5xl font-extrabold text-center text-[#f5d061] mb-12 drop-shadow-md tracking-wide">📜 The Digital Museum of Untold Stories</h1>

      <div className="w-full max-w-3xl bg-[#1c181a] p-8 rounded-xl shadow-2xl border border-[#f5d061] backdrop-blur-md">
        <input
          type="text"
          placeholder="Enter your story title..."
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full text-2xl font-semibold bg-transparent border-b-2 border-[#f5d061] focus:outline-none p-3 mb-6 placeholder-[#e3c27e] text-[#e3c27e]"
        />
        <select
          value={formData.storyType}
          onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
          className="w-full text-lg bg-[#2d2528] border border-[#f5d061] p-3 rounded-md text-[#e3c27e] font-medium shadow-sm"
        >
          <option value="">Select Story Type</option>
          {["Real-Life", "Folklore", "Myth", "Local Culture"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-3xl mt-8 space-y-6">
        {formData.content.map((item, index) => (
          <div key={index} className="relative p-6 bg-[#33292b] border border-[#f5d061] rounded-lg shadow-md">
            <button
              onClick={() => removeContent(index)}
              className="absolute top-2 right-2 text-[#f5d061] font-bold hover:text-red-500 transition duration-200"
            >❌</button>
            {item.type === "text" ? (
              <textarea
                value={item.value}
                onChange={(e) => handleTextChange(index, e.target.value)}
                rows="6"
                className="w-full text-lg bg-transparent border-b-2 border-[#f5d061] focus:outline-none p-3 text-[#e3c27e] placeholder-[#e3c27e]"
                placeholder="Write your story..."
              />
            ) : item.type === "image" ? (
              <img src={item.value} alt="Uploaded" className="w-full rounded-lg border border-[#f5d061] shadow-md" />
            ) : item.type === "video" ? (
              <video controls className="w-full rounded-lg border border-[#f5d061] shadow-md">
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

      <div className="flex gap-4 flex-wrap mt-6">
        <button onClick={() => addContent("text", "")} className="bg-[#f5d061] text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#e0b750] transition duration-200 shadow-md">
          ➕ Add Text Section
        </button>
        {['image', 'audio', 'video'].map((type) => (
          <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
            {({ open }) => (
              <button type="button" onClick={() => open()} className="bg-[#f5d061] text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#e0b750] transition duration-200 shadow-md">
                📤 Upload {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            )}
          </CldUploadWidget>
        ))}
      </div>

      <button onClick={handleSubmit} className="mt-8 bg-[#f5d061] text-black py-4 px-8 rounded-lg text-xl font-bold w-full max-w-3xl hover:bg-[#e0b750] transition duration-200 shadow-lg">
        🚀 Submit Your Story
      </button>
    </div>
  );
};

export default StorySubmission;