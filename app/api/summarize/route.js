// export async function POST(req) {
//   try {
//     const { text } = await req.json();

//     if (!text || text.trim() === "") {
//       return new Response(
//         JSON.stringify({ success: false, message: "No story provided" }),
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{
//                 text: `Please provide a detailed summary of the following story. Highlight the key events, characters, emotions, and any important messages or morals. Make it descriptive and around 3–5 paragraphs long:\n\n${text}`
//               }],
//             },
//           ],
//         }),
//       }
//     );
    
//     // ✅ Try parsing safely
//     let data;
//     try {
//       data = await response.json();
//     } catch (jsonError) {
//       console.error("Failed to parse Gemini response:", jsonError);
//       throw new Error("Invalid response from Gemini API");
//     }
    
//     if (!response.ok) {
//       console.error("Gemini API Error:", data?.error);
//       throw new Error(data?.error?.message || "Gemini API Error");
//     }
    
    

//     if (data.candidates && data.candidates[0]) {
//       const summary = data.candidates[0].content.parts[0].text;
//       return new Response(JSON.stringify({ success: true, summary }), {
//         status: 200,
//       });
//     } else {
//       throw new Error(data.error?.message || "Failed to generate summary");
//     }
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message || "Server Error" }),
//       { status: 500 }
//     );
//   }
// }



export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, message: "No story provided" }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Please provide a detailed summary of the following story. Highlight the key events, characters, emotions, and any important messages or morals also some history. Make it descriptive and around 8-10 line long:\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    // 🧠 Check if content-type is JSON before parsing
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response from Gemini:", text);
      return new Response(
        JSON.stringify({
          success: false,
          message: "The AI service returned an unexpected response.",
        }),
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data?.error);
      throw new Error(data?.error?.message || "Gemini API Error");
    }

    if (data.candidates && data.candidates[0]) {
      const summary = data.candidates[0].content.parts[0].text;
      return new Response(JSON.stringify({ success: true, summary }), {
        status: 200,
      });
    } else {
      throw new Error(data.error?.message || "Failed to generate summary");
    }
  } catch (error) {
    console.error("Error generating summary:", error.message || error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Something went wrong with the summary.",
      }),
      { status: 500 }
    );
  }
}
