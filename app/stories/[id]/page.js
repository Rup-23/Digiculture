// // DigiCulture: Digital Museum Style - Updated Content Page
// import dbConnect from "@/lib/dbConnect";
// import Story from "@/models/storyModel";
// import Link from "next/link";
// import SummarizeButtonWrapper from "@/components/SummarizeButtonWrapper";

// export default async function StoryPage({ params }) {
//   await dbConnect();
//   const { id } = await params;

//   if (!id) {
//     return <p className="text-center text-gray-400 text-xl font-semibold">Invalid Story ID</p>;
//   }

//   let story;
//   try {
//     story = await Story.findById(id);
//     if (!story) {
//       return <p className="text-center text-gray-400 text-xl font-semibold">Story not found</p>;
//     }
//   } catch (error) {
//     console.error("Error fetching story:", error);
//     return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
//   }

//   const storyText = story.content
//     .filter((item) => item.type === "text")
//     .map((item) => item.value)
//     .join(" ");

//   return (
//     <div className="w-full min-h-screen bg-[#1A1A1A] text-gray-100 flex flex-col items-center py-20 px-6">
//       {/* Header Section */}
//       <div className="text-center mb-16 max-w-3xl border-b-2 border-[#FFD700] pb-6">
//         <h1 className="text-5xl font-bold text-[#FFD700] uppercase tracking-wider">{story.title}</h1>
//         <p className="text-md text-gray-400 mt-3 italic">Story Type: {story.storyType || "Exhibit"}</p>
//       </div>

//       {/* About the Exhibit */}
//       <div className="bg-[#2A2A2A] border border-[#FFD700] rounded-xl p-6 mb-10 max-w-3xl w-full shadow-xl">
//         <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">About this Exhibit</h2>
//         <p className="text-md text-gray-300 leading-relaxed text-justify">
//           This exhibit is a curated story reflecting a unique piece of cultural or historical relevance. Explore the visuals and narratives as if you're walking through a museum gallery.
//         </p>
//       </div>

//       {/* Exhibit Gallery */}
//       <div className="grid gap-12 max-w-4xl w-full grid-cols-1 md:grid-cols-2">
//         {story.content.map((item, index) => (
//           <div key={index} className="bg-[#222] rounded-lg p-4 border border-[#FFD700] shadow-md">
//             {item.type === "text" && (
//               <div>
//                 <h3 className="text-lg font-semibold text-[#FFD700] mb-2">Narrative Excerpt</h3>
//                 <p className="text-gray-300 leading-relaxed text-justify font-serif">"{item.value}"</p>
//               </div>
//             )}
//             {item.type === "image" && (
//               <div>
//                 <img
//                   src={item.value}
//                   alt="Exhibit"
//                   className="rounded-lg border-4 border-[#FFD700] object-contain w-full"
//                 />
//                 <p className="text-sm text-gray-400 mt-2 italic text-center">Photographic artifact</p>
//               </div>
//             )}
//             {item.type === "video" && (
//               <div>
//                 <video controls className="rounded-lg border-4 border-[#FFD700] w-full">
//                   <source src={item.value} />
//                 </video>
//                 <p className="text-sm text-gray-400 mt-2 italic text-center">Video archive material</p>
//               </div>
//             )}
//             {item.type === "audio" && (
//               <div>
//                 <audio controls className="w-full mt-2">
//                   <source src={item.value} />
//                 </audio>
//                 <p className="text-sm text-gray-400 mt-2 italic text-center">Audio commentary or oral history</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Summarize Button */}
//       <div className="mt-16">
//         <SummarizeButtonWrapper storyText={storyText} />
//       </div>

//       {/* Share CTA */}
//       <div className="text-center mt-24 max-w-3xl">
//         <h2 className="text-4xl font-bold text-[#FFD700] mb-4">Contribute to the Archive</h2>
//         <p className="text-lg text-gray-400 mb-6 leading-relaxed">
//           Every story matters. Help us preserve human experiences by submitting your own cultural, historical, or personal narrative.
//         </p>
//         <Link href="/stories/form">
//           <button className="bg-[#FFD700] text-black font-bold py-2 px-5 rounded-md hover:shadow-lg transition-all">
//             Submit Your Story
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }



// DigiCulture: Digital Museum Style - Audio Styling
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";
import Link from "next/link";
import SummarizeButtonWrapper from "@/components/SummarizeButtonWrapper";

export default async function StoryPage({ params }) {
  await dbConnect();
  const { id } = await params;

  if (!id) {
    return <p className="text-center text-gray-400 text-xl font-semibold">Invalid Story ID</p>;
  }

  let story;
  try {
    story = await Story.findById(id);
    if (!story) {
      return <p className="text-center text-gray-400 text-xl font-semibold">Story not found</p>;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
  }

  const storyText = story.content
    .filter((item) => item.type === "text")
    .map((item) => item.value)
    .join(" ");

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-gray-100 flex flex-col items-center py-28  px-6">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl border-b-2 border-[#FFD700] pb-6">
        <h1 className="text-5xl font-bold text-[#FFD700] uppercase tracking-wider">{story.title}</h1>
        <p className="text-md text-gray-400 mt-3 italic">Story Type: {story.storyType || "Exhibit"}</p>
      </div>

      {/* About the Exhibit */}
      <div className="bg-[#2A2A2A] border border-[#FFD700] rounded-xl p-6 mb-10 max-w-3xl w-full shadow-xl">
        <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">About this Exhibit</h2>
        <p className="text-md text-gray-300 leading-relaxed text-justify">
          This exhibit is a curated story reflecting a unique piece of cultural or historical relevance. Explore the visuals and narratives as if you're walking through a museum gallery.
        </p>
      </div>

      {/* Exhibit Gallery */}
      <div className="grid gap-12 max-w-4xl w-full grid-cols-1 md:grid-cols-2">
        {story.content.map((item, index) => (
          <div key={index} className="bg-[#222] rounded-lg p-4 border border-[#FFD700] shadow-md">
            {item.type === "text" && (
              <div>
                <h3 className="text-lg font-semibold text-[#FFD700] mb-2">Narrative Excerpt</h3>
                <p className="text-gray-300 leading-relaxed text-justify font-serif">"{item.value}"</p>
              </div>
            )}
            {item.type === "image" && (
              <div>
                <img
                  src={item.value}
                  alt="Exhibit"
                  className="rounded-lg object-contain w-full"
                />
                <p className="text-sm text-gray-400 mt-2 italic text-center">Photographic artifact</p>
              </div>
            )}
            {item.type === "video" && (
              <div>
                <video controls className="rounded-lg w-full">
                  <source src={item.value} />
                </video>
                <p className="text-sm text-gray-400 mt-2 italic text-center">Video archive material</p>
              </div>
            )}
            {item.type === "audio" && (
              <div className="bg-[#333] rounded-lg p-4 border border-[#FFD700]">
                <audio
                  controls
                  className="w-full rounded-lg bg-[#2A2A2A] p-3 text-[#FFD700] outline-none"
                  style={{
                    backgroundColor: "#1A1A1A",
                    borderRadius: "12px",
                    border: "none",
                  }}
                >
                  <source src={item.value} />
                </audio>
                <p className="text-sm text-gray-400 mt-2 italic text-center">Audio commentary or oral history</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summarize Button */}
      <div className="mt-16">
        <SummarizeButtonWrapper storyText={storyText} />
      </div>

      {/* Share CTA */}
      <div className="text-center mt-24 max-w-3xl">
        <h2 className="text-4xl font-bold text-[#FFD700] mb-4">Contribute to the Archive</h2>
        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
          Every story matters. Help us preserve human experiences by submitting your own cultural, historical, or personal narrative.
        </p>
        <Link href="/stories/form">
          <button className="bg-[#FFD700] text-black font-bold py-2 px-5 rounded-md hover:shadow-lg transition-all">
            Submit Your Story
          </button>
        </Link>
      </div>
    </div>
  );
}
