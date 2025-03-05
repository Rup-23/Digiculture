import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export default async function StoryPage({ params }) {
  await dbConnect(); // Connect to the database

  if (!params?.id) {
    return <p className="text-center text-black">Invalid Story ID</p>;
  }

  let story;
  try {
    story = await Story.findById(params.id);
    if (!story) {
      return <p className="text-center text-black">Story not found</p>;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return <p className="text-center text-red-500">Error loading story</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-28 text-black">
      <h1 className="text-4xl font-bold mb-2">{story.title}</h1>

      <h2 className="text-lg font-semibold text-gray-600 mb-4">
        Story Type: <span className="text-black">{story.storyType || "Unknown"}</span>
      </h2>

      {/* Render story content in the correct order */}
      <div className="space-y-4">
        {story.content.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-50">
            {item.type === "text" && <p className="text-lg">{item.value}</p>}
            {item.type === "image" && (
              <img src={item.value} alt="Story Image" className="w-full max-h-60 object-cover rounded-lg" />
            )}
            {item.type === "video" && (
              <video controls className="w-full max-h-60 rounded-lg">
                <source src={item.value} />
              </video>
            )}
            {item.type === "audio" && (
              <audio controls className="w-full">
                <source src={item.value} />
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
