export async function GET() {
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models?key=" + process.env.GEMINI_API_KEY
      );
      const data = await res.json();
  
      return new Response(JSON.stringify({ success: true, models: data }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
      });
    }
  }
  