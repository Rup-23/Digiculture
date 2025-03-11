// import mongoose from "mongoose";

// const StorySchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   storyType: { type: String, enum: ["Myth", "Folklore", "Real-Life", "Local Culture"], required: true },
//   content: [
//     {
//       type: { type: String, enum: ["text", "image", "audio", "video"], required: true },
//       value: { type: String, required: true } // URL for media or text content
//     }
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Story || mongoose.model("Story", StorySchema);



import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  storyType: { type: String, enum: ["Myth", "Folklore", "Real-Life", "Local Culture"], required: true },
  content: [
    {
      type: { type: String, enum: ["text", "image", "audio", "video"], required: true },
      value: { type: String, required: true }, // URL for media or text content
      publicId: { type: String }, // Cloudinary Public ID for deletion
    }
  ],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
