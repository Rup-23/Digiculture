import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";
import Link from "next/link";

export default async function StoryPage({ params }) {
  await dbConnect();

  if (!params?.id) {
    return <p className="text-center text-gray-400 text-xl font-semibold">Invalid Story ID</p>;
  }

  let story;
  try {
    story = await Story.findById(params.id);
    if (!story) {
      return <p className="text-center text-gray-400 text-xl font-semibold">Story not found</p>;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-gray-200 flex flex-col items-center py-24 px-5">
      {/* Museum-Like Title Display */}
      <div className="text-center border-b-8 border-[#FFD700] pb-6 w-full max-w-5xl">
        <h1 className="text-5xl font-extrabold text-[#FFD700] uppercase tracking-widest">
          {story.title}
        </h1>
        <h2 className="text-lg font-semibold text-gray-400 mt-4">
          Story Type: <span className="text-gray-300">{story.storyType || "Unknown"}</span>
        </h2>
      </div>

      {/* Content as Digital Museum Exhibits */}
      <div className="w-full max-w-6xl flex flex-col gap-20 mt-16">
        {story.content.map((item, index) => (
          <div 
            key={index} 
            className="relative w-full flex flex-col items-center md:flex-row md:items-center md:justify-center border border-gray-700 p-8 rounded-lg shadow-lg transition-transform hover:scale-[1.05] bg-[#1e1e1e]"
          >
            {item.type === "text" && (
              <p className="text-xl leading-relaxed text-gray-300 max-w-4xl text-justify font-serif">
                "{item.value}"
              </p>
            )}
            {item.type === "image" && (
              <div className="flex justify-center w-full">
                <img src={item.value} alt="Story Exhibit" className="w-[400px] h-[400px] object-cover rounded-lg shadow-md border-4 border-[#FFD700]" />
              </div>
            )}
            {item.type === "video" && (
              <div className="flex justify-center w-full">
                <video controls className="w-[300px] max-w-3xl rounded-lg shadow-md border-4 border-[#FFD700]">
                  <source src={item.value} />
                </video>
              </div>
            )}
            {item.type === "audio" && (
              <div className="flex justify-center w-full">
                <audio controls className="w-3/4">
                  <source src={item.value} />
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share Your Story Section */}
      <div className="container mx-auto text-center mt-24">
        <h2 className="text-5xl font-bold text-[#FFD700] mb-6">Share Your Story</h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
          Contribute your untold narratives and help us expand the tapestry of human history.
        </p>
        <Link href="/stories/form">
          <button className="bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            Share Your Story
          </button>
        </Link>
      </div>
    </div>
  );
}