import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const story = await Story.findById(params.id);

    if (!story) {
      return new Response(JSON.stringify({ success: false, message: "Story not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, story }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return new Response(JSON.stringify({ success: false, message: "Error fetching story." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
