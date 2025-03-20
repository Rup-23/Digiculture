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
    <div className="min-h-screen bg-[#2a1a1f] flex items-center justify-center p-6 py-28">
      <div className="max-w-4xl w-full bg-[#3b272e] p-8 rounded-xl shadow-xl border-4 border-[#d4af37] text-[#f8e1a4]">
        <h1 className="text-4xl font-bold text-center text-[#d4af37] italic">📜 Share Your Untold Story</h1>
        
        <div className="mt-6 bg-[#4a313b] p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Enter your story title..."
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 bg-transparent border-b-2 border-[#d4af37] focus:outline-none text-lg"
            required
          />
          <select
            value={formData.storyType}
            onChange={(e) => setFormData((prev) => ({ ...prev, storyType: e.target.value }))}
            className="mt-4 w-full p-3 bg-[#5b3a42] border border-[#d4af37] rounded-md"
          >
            <option value="">Select Story Type</option>
            {["Real-Life", "Folklore", "Myth", "Local Culture"].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 bg-[#5b3a42] p-6 rounded-lg space-y-4">
          {formData.content.map((item, index) => (
            <div key={index} className="relative p-4 bg-[#704d57] border border-[#d4af37] rounded-lg">
              <button
                onClick={() => removeContent(index)}
                className="absolute top-2 right-2 text-[#d4af37] font-bold"
              >
                ❌
              </button>
              {item.type === "text" ? (
                <textarea
                  value={item.value}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  rows="3"
                  className="w-full p-2 bg-transparent border-b-2 border-[#d4af37] focus:outline-none"
                  placeholder="Write your story..."
                />
              ) : item.type === "image" ? (
                <img src={item.value} alt="Uploaded" className="w-[300px] rounded-lg border border-[#d4af37]" />
              ) : item.type === "video" ? (
                <video controls className="w-[300px] rounded-lg border border-[#d4af37]">
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

        <button onClick={() => addContent("text", "")} className="mt-6 bg-[#d4af37] text-black py-2 px-4 rounded-md w-full">
          ➕ Add Text
        </button>

        <div className="mt-4 flex flex-wrap gap-2">
          {["image", "audio", "video"].map((type) => (
            <CldUploadWidget key={type} uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(res, type)}>
              {({ open }) => (
                <button type="button" onClick={() => open()} className="bg-[#d4af37] text-black py-2 px-4 rounded-md w-full">
                  📤 Upload {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )}
            </CldUploadWidget>
          ))}
        </div>

        <button onClick={handleSubmit} className="mt-6 bg-[#d4af37] text-black py-2 px-6 rounded-md w-full font-bold">
          🚀 Submit Your Story
        </button>
      </div>
    </div>
  );
};

export default StorySubmission;

