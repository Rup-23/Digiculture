import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filter = {};
    if (category) {
      filter.storyType = category;
    }

    const stories = await Story.find(filter).sort({ createdAt: -1 });

    return new Response(JSON.stringify(stories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(JSON.stringify({ message: "Error fetching stories." }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { title, storyType, content } = await req.json();

    // Validate required fields
    if (!title || !storyType || !content || !Array.isArray(content) || content.length === 0) {
      return new Response(
        JSON.stringify({ message: "Title, storyType, and content are required." }),
        { status: 400 }
      );
    }

    // Allowed content types
    const allowedTypes = ["text", "image", "audio", "video"];

    // Validate each content item
    for (const item of content) {
      if (!item.type || !allowedTypes.includes(item.type) || !item.value) {
        return new Response(
          JSON.stringify({ message: "Invalid content format. Each item must have a valid type and value." }),
          { status: 400 }
        );
      }
    }

    // Create a new story document
    const newStory = new Story({
      title,
      storyType,
      content,
    });

    // Save to database
    await newStory.save();

    return new Response(JSON.stringify({ message: "Story submitted successfully!" }), {
      status: 201, // Changed to 201 (Created)
    });
  } catch (error) {
    console.error("Error submitting story:", error);
    return new Response(JSON.stringify({ message: "Error submitting story." }), {
      status: 500,
    });
  }
}
