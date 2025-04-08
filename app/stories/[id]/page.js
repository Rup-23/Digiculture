
// import dbConnect from "@/lib/dbConnect";
// import Story from "@/models/storyModel";
// import Link from "next/link";

// // ✅ Import the SummarizeButtonWrapper client component
// import SummarizeButtonWrapper from "@/components/SummarizeButtonWrapper";

// export default async function StoryPage({ params }) {
//   await dbConnect();

//   if (!params?.id) {
//     return <p className="text-center text-gray-400 text-xl font-semibold">Invalid Story ID</p>;
//   }

//   let story;
//   try {
//     story = await Story.findById(params.id);
//     if (!story) {
//       return <p className="text-center text-gray-400 text-xl font-semibold">Story not found</p>;
//     }
//   } catch (error) {
//     console.error("Error fetching story:", error);
//     return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
//   }

//   // ✅ Combine all text content for AI summary
//   const storyText = story.content
//     .filter((item) => item.type === "text")
//     .map((item) => item.value)
//     .join(" ");

//   return (
//     <div className="w-full min-h-screen bg-[#121212] text-gray-200 flex flex-col items-center py-24 px-5">
//       {/* Title Section */}
//       <div className="text-center pb-6 w-full max-w-4xl">
//         <h1 className="text-5xl font-extrabold text-[#FFD700] uppercase tracking-widest">
//           {story.title}
//         </h1>
//         <h2 className="text-lg font-semibold text-gray-400 mt-2">
//           Story Type: <span className="text-gray-300">{story.storyType || "Unknown"}</span>
//         </h2>
//       </div>

//       {/* Story Content */}
//       <div className="w-full max-w-4xl flex flex-col gap-12 mt-12">
//         {story.content.map((item, index) => (
//           <div key={index} className="w-full">
//             {item.type === "text" && (
//               <p className="text-lg leading-relaxed text-gray-300 text-justify font-serif">
//                 "{item.value}"
//               </p>
//             )}
//             {item.type === "image" && (
//               <div className="flex justify-center my-4">
//                 <img
//                   src={item.value}
//                   alt="Story Exhibit"
//                   className="w-full max-w-3xl rounded-lg shadow-md object-contain border-4 border-[#FFD700]"
//                 />
//               </div>
//             )}
//             {item.type === "video" && (
//               <div className="flex justify-center my-4">
//                 <video controls className="w-[400px] h-[400px] max-w-2xl rounded-lg shadow-md border-4 border-[#FFD700]">
//                   <source src={item.value} />
//                 </video>
//               </div>
//             )}
//             {item.type === "audio" && (
//               <div className="flex justify-center my-4">
//                 <audio controls className="w-full max-w-md">
//                   <source src={item.value} />
//                 </audio>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ✅ Summarize Button (Now wrapped in a client-side component) */}
//       <SummarizeButtonWrapper storyText={storyText} />

//       {/* Share CTA */}
//       <div className="container mx-auto text-center mt-24">
//         <h2 className="text-5xl font-bold text-[#FFD700] mb-6">Share Your Story</h2>
//         <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
//           Contribute your untold narratives and help us expand the tapestry of human history.
//         </p>
//         <Link href="/stories/form">
//           <button className="bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
//             Share Your Story
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";
import Link from "next/link";

// ✅ Import the SummarizeButtonWrapper client component
import SummarizeButtonWrapper from "@/components/SummarizeButtonWrapper";

export default async function StoryPage({ params }) {
  await dbConnect();

  // ✅ Await the params object to ensure it's resolved
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

  // ✅ Combine all text content for AI summary
  const storyText = story.content
    .filter((item) => item.type === "text")
    .map((item) => item.value)
    .join(" ");

  return (
    <div className="w-full min-h-screen bg-[#121212] text-gray-200 flex flex-col items-center py-24 px-5">
      {/* Title Section */}
      <div className="text-center pb-6 w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-[#FFD700] uppercase tracking-widest">
          {story.title}
        </h1>
        <h2 className="text-lg font-semibold text-gray-400 mt-2">
          Story Type: <span className="text-gray-300">{story.storyType || "Unknown"}</span>
        </h2>
      </div>

      {/* Story Content */}
      <div className="w-full max-w-4xl flex flex-col gap-12 mt-12">
        {story.content.map((item, index) => (
          <div key={index} className="w-full">
            {item.type === "text" && (
              <p className="text-lg leading-relaxed text-gray-300 text-justify font-serif">
                "{item.value}"
              </p>
            )}
            {item.type === "image" && (
              <div className="flex justify-center my-4">
                <img
                  src={item.value}
                  alt="Story Exhibit"
                  className="w-full max-w-3xl rounded-lg shadow-md object-contain border-4 border-[#FFD700]"
                />
              </div>
            )}
            {item.type === "video" && (
              <div className="flex justify-center my-4">
                <video controls className="w-[400px] h-[400px] max-w-2xl rounded-lg shadow-md border-4 border-[#FFD700]">
                  <source src={item.value} />
                </video>
              </div>
            )}
            {item.type === "audio" && (
              <div className="flex justify-center my-4">
                <audio controls className="w-full max-w-md">
                  <source src={item.value} />
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Summarize Button (Now wrapped in a client-side component) */}
      <SummarizeButtonWrapper storyText={storyText} />

      {/* Share CTA */}
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