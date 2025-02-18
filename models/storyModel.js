import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  storyType: { type: String, enum: ["Myth", "Folklore", "Real-Life", "Local Culture"], required: true },
  imageUrl: { type: String }, // Cloudinary URL for image
  audioUrl: { type: String }, // Cloudinary URL for audio
  videoUrl: { type: String }, // Cloudinary URL for video
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Story || mongoose.model("Story", StorySchema);

