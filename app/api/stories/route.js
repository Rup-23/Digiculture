import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export async function GET(req) {
  try {
    await dbConnect(); // Database connect karna

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category"); // ?category=Folklore

    let filter = {};
    if (category) {
      filter.storyType = category; // Filter by storyType if category exists
    }

    const stories = await Story.find(filter); // Filtered stories fetch karna

    return new Response(JSON.stringify(stories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(JSON.stringify({ message: "Error fetching stories" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect(); // Database connect karna

    // Request body parse karna
    const { title, description, storyType, mediaType, images, audios, videos } = await req.json();

    if (!title || !description || !storyType) {
      return new Response(JSON.stringify({ message: "Title, description, and category are required." }), {
        status: 400,
      });
    }

    // Ensure that at least one media URL (image, audio, or video) is provided
    if (!images?.length && !audios?.length && !videos?.length) {
      return new Response(JSON.stringify({ message: "At least one media file is required." }), {
        status: 400,
      });
    }

    // Join arrays into strings for storage
    const imageUrls = images?.join(", ") || "";
    const audioUrls = audios?.join(", ") || "";
    const videoUrls = videos?.join(", ") || "";

    // Create a new story document
    const newStory = new Story({
      title,
      description,
      storyType, // Ensure storyType (category) is saved
      mediaType,
      imageUrl: imageUrls,
      audioUrl: audioUrls,
      videoUrl: videoUrls,
    });

    // Save to the database
    await newStory.save();

    return new Response(JSON.stringify({ message: "Story submitted successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting story:", error);
    return new Response(JSON.stringify({ message: "Error submitting story." }), {
      status: 500,
    });
  }
}


