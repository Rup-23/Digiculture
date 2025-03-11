// import dbConnect from "@/lib/dbConnect";
// import Story from "@/models/storyModel";

// export default async function StoryPage({ params }) {
//   await dbConnect(); // Connect to the database

//   if (!params?.id) {
//     return <p className="text-center text-black">Invalid Story ID</p>;
//   }

//   let story;
//   try {
//     story = await Story.findById(params.id);
//     if (!story) {
//       return <p className="text-center text-black">Story not found</p>;
//     }
//   } catch (error) {
//     console.error("Error fetching story:", error);
//     return <p className="text-center text-red-500">Error loading story</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-28 text-black">
//       <h1 className="text-4xl font-bold mb-2">{story.title}</h1>

//       <h2 className="text-lg font-semibold text-gray-600 mb-4">
//         Story Type: <span className="text-black">{story.storyType || "Unknown"}</span>
//       </h2>

//       {/* Render story content in the correct order */}
//       <div className="space-y-4">
//         {story.content.map((item, index) => (
//           <div key={index} className="border p-4 rounded-lg bg-gray-50">
//             {item.type === "text" && <p className="text-lg">{item.value}</p>}
//             {item.type === "image" && (
//               <img src={item.value} alt="Story Image" className="w-full max-h-60 object-contain rounded-lg" />
//             )}
//             {item.type === "video" && (
//               <video controls className="w-full max-h-60 rounded-lg">
//                 <source src={item.value} />
//               </video>
//             )}
//             {item.type === "audio" && (
//               <audio controls className="w-full">
//                 <source src={item.value} />
//               </audio>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";

export default async function StoryPage({ params }) {
  await dbConnect(); // Connect to the database

  if (!params?.id) {
    return <p className="text-center text-gray-700 text-xl font-semibold">Invalid Story ID</p>;
  }

  let story;
  try {
    story = await Story.findById(params.id);
    if (!story) {
      return <p className="text-center text-gray-700 text-xl font-semibold">Story not found</p>;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-gray-900 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-600">{story.title}</h1>

      <h2 className="text-lg font-semibold text-gray-500 mb-6 text-center">
        Story Type: <span className="text-gray-800">{story.storyType || "Unknown"}</span>
      </h2>

      {/* Render story content in the correct order */}
      <div className="space-y-6">
        {story.content.map((item, index) => (
          <div key={index} className="border p-5 rounded-xl bg-gray-50 shadow-sm">
            {item.type === "text" && <p className="text-lg leading-relaxed text-gray-800">{item.value}</p>}
            {item.type === "image" && (
              <img
                src={item.value}
                alt="Story Image"
                className="w-full max-h-80 object-contain rounded-xl shadow-md"
              />
            )}
            {item.type === "video" && (
              <video controls className="w-full max-h-80 rounded-xl shadow-md">
                <source src={item.value} />
              </video>
            )}
            {item.type === "audio" && (
              <div className="flex justify-center">
                <audio controls className="w-3/4">
                  <source src={item.value} />
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
