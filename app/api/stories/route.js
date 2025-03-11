// import dbConnect from "@/lib/dbConnect";
// import Story from "@/models/storyModel";

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get("category");

//     let filter = {};
//     if (category) {
//       filter.storyType = category;
//     }

//     const stories = await Story.find(filter).sort({ createdAt: -1 });

//     return new Response(JSON.stringify(stories), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching stories:", error);
//     return new Response(JSON.stringify({ message: "Error fetching stories." }), {
//       status: 500,
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     await dbConnect(); // Connect to MongoDB

//     const { title, storyType, content } = await req.json();

//     // Validate required fields
//     if (!title || !storyType || !content || !Array.isArray(content) || content.length === 0) {
//       return new Response(
//         JSON.stringify({ message: "Title, storyType, and content are required." }),
//         { status: 400 }
//       );
//     }

//     // Allowed content types
//     const allowedTypes = ["text", "image", "audio", "video"];

//     // Validate each content item
//     for (const item of content) {
//       if (!item.type || !allowedTypes.includes(item.type) || !item.value) {
//         return new Response(
//           JSON.stringify({ message: "Invalid content format. Each item must have a valid type and value." }),
//           { status: 400 }
//         );
//       }
//     }

//     // Create a new story document
//     const newStory = new Story({
//       title,
//       storyType,
//       content,
//     });

//     // Save to database
//     await newStory.save();

//     return new Response(JSON.stringify({ message: "Story submitted successfully!" }), {
//       status: 201, // Changed to 201 (Created)
//     });
//   } catch (error) {
//     console.error("Error submitting story:", error);
//     return new Response(JSON.stringify({ message: "Error submitting story." }), {
//       status: 500,
//     });
//   }
// }




import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";
import { deleteFromCloudinary } from "@/lib/cloudinary"; // Import for media deletion


// ✅ GET - Fetch only approved stories for users
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");

    const status = searchParams.get("status") || "approved"; // Default to "approved" stories
    const category = searchParams.get("category"); // Get category from query params

    const filter = { status };
    if (category) {
      filter.storyType = category; // ✅ Apply category filter
    }

    const stories = await Story.find(filter).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, stories }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching stories.", error: error.message }),
      { status: 500 }
    );
  }
}


// ✅ POST - Submit a new story
export async function POST(req) {
  try {
    await dbConnect();
    const { title, storyType, content } = await req.json();

    if (!title || !storyType || !Array.isArray(content) || content.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "Invalid story data." }), { status: 400 });
    }

    const allowedTypes = ["text", "image", "audio", "video"];
    if (!content.every((item) => item.type && allowedTypes.includes(item.type) && item.value)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid content format." }), { status: 400 });
    }

    const newStory = new Story({ title, storyType, content, status: "pending" });
    await newStory.save();

    return new Response(JSON.stringify({ success: true, message: "Story submitted for approval!" }), { status: 201 });
  } catch (error) {
    console.error("Error submitting story:", error);
    return new Response(JSON.stringify({ success: false, message: "Error submitting story." }), { status: 500 });
  }
}

// ✅ PUT - Approve a Story
export async function PUT(req) {
  try {
    await dbConnect();
    const { storyId } = await req.json();

    if (!storyId) {
      return new Response(JSON.stringify({ success: false, message: "Story ID is required." }), { status: 400 });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return new Response(JSON.stringify({ success: false, message: "Story not found." }), { status: 404 });
    }

    // ✅ Approve the story
    story.status = "approved";
    await story.save();

    return new Response(JSON.stringify({ success: true, message: "Story approved!" }), { status: 200 });
  } catch (error) {
    console.error("Error approving story:", error);
    return new Response(JSON.stringify({ success: false, message: "Error approving story." }), { status: 500 });
  }
}

// ✅ DELETE - Reject a Story
export async function DELETE(req) {
  try {
    await dbConnect();
    const { storyId } = await req.json();

    if (!storyId) {
      return new Response(JSON.stringify({ success: false, message: "Story ID is required." }), { status: 400 });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return new Response(JSON.stringify({ success: false, message: "Story not found." }), { status: 404 });
    }

    // ✅ Delete media from Cloudinary before removing the story
    const deletePromises = story.content
      .filter((item) => item.type !== "text")
      .map((item) => deleteFromCloudinary(item.value));

    await Promise.all(deletePromises);
    await Story.findByIdAndDelete(storyId);

    return new Response(JSON.stringify({ success: true, message: "Story rejected and deleted." }), { status: 200 });
  } catch (error) {
    console.error("Error rejecting story:", error);
    return new Response(JSON.stringify({ success: false, message: "Error rejecting story." }), { status: 500 });
  }
}



