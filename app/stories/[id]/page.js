import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export default async function StoryPage({ params }) {
  await dbConnect(); // Database se connect karo

  if (!params || !params.id) {
    return <p className="text-center text-black">Invalid Story ID</p>;
  }

  const { id } = params;

  let story;
  try {
    story = await Story.findById(id);
    console.log("Fetched Story:", story);
  } catch (error) {
    console.error("Error fetching story:", error);
  }

  if (!story) {
    return <p className="text-center text-black">Story not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-28 text-black">
      <h1 className="text-4xl font-bold mb-2">{story.title}</h1>

      {/* 🔹 Story Type Display */}
      <h2 className="text-lg font-semibold text-gray-600 mb-4">
        Story Type: <span className="text-black">{story.storyType || "Unknown"}</span>
      </h2>

      {story.content ? (
        <div dangerouslySetInnerHTML={{ __html: story.content }} className="prose max-w-none" />
      ) : (
        <>
          {/* Image */}
          {story.imageUrl && story.imageUrl.trim() !== "" && (
            <img
              src={story.imageUrl.split(",")[0]}
              alt={story.title}
              className="w-60 h-44 rounded-lg mb-4"
            />
          )}

          {/* Description */}
          <h2 className="text-xl font-semibold mt-6 mb-5">Description :</h2>
          <p className="text-lg">{story.description}</p>

          {/* Video Section */}
          {story.videoUrl && story.videoUrl.trim() !== "" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Watch Video:</h2>
              <video controls className="w-full max-w-md">
                <source src={story.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </>
      )}
    </div>
  );
}

