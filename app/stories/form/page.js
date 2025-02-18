"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const StoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    storyType: "",
    mediaType: "",
    images: [],
    audios: [],
    videos: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCloudinaryUpload = (type, result) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], result.info.secure_url] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    response.ok ? alert("Story submitted successfully!") : alert("Error submitting story.");
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">📖 Share Your Story</h1>
      <p className="text-center text-gray-600 mb-8">Your stories matter. Inspire, educate, and share with the world.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input id="title" type="text" placeholder="Story Title" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        
        <textarea id="description" placeholder="Write your story..." value={formData.description} onChange={handleChange} rows="10" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        
        <div className="grid grid-cols-2 gap-4">
          <select id="storyType" value={formData.storyType} onChange={handleChange} className="w-full p-3 border rounded-lg">
            <option value="">Select Story Type</option>
            {['Real-Life', 'Folklore', 'Myth', 'Local Culture'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select id="mediaType" value={formData.mediaType} onChange={handleChange} className="w-full p-3 border rounded-lg">
            <option value="">Select Media Type</option>
            {['text', 'image', 'audio', 'video', 'all'].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        
        {['images', 'audios', 'videos'].map((type) => (
          (formData.mediaType === type.slice(0, -1) || formData.mediaType === "all") && (
            <div key={type} className="bg-white p-4 rounded-lg shadow">
              <label className="block text-lg font-semibold mb-2">Upload {type.charAt(0).toUpperCase() + type.slice(1)}</label>
              <CldUploadWidget uploadPreset="nextjs" onSuccess={(res) => handleCloudinaryUpload(type, res)}>
                {({ open }) => <button type="button" onClick={() => open()} className="bg-blue-600 text-sm font-semibold text-white px-4 py-2 rounded-lg">Upload {type}</button>}
              </CldUploadWidget>
              {formData[type].length > 0 && <p className="mt-2 text-green-500">Uploaded {type}: {formData[type].length}</p>}
            </div>
          )
        ))}
        
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold">Submit Story</button>
      </form>
    </div>
  );
};

export default StoryForm;

