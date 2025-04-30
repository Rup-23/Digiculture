
"use client";

import { useState, useRef, useEffect } from "react";

export default function SummarizeButton({ storyText }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const summaryRef = useRef(null);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000;

  const handleSummarize = async () => {
    if (!storyText || storyText.trim() === "") {
      setError("No story content found to summarize.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary(null);

    await trySummarize(1);
  };

  const trySummarize = async (attempt) => {
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: storyText }),
      });

      const rawText = await res.text(); // ✅ Only read once!

      let data;
      try {
        data = JSON.parse(rawText); // safely parse
      } catch (err) {
        console.error("Non-JSON response from Gemini:", rawText);
        throw new Error("AI service returned an unexpected response.");
      }

      if (!res.ok || !data.success) {
        const message = data.message?.toLowerCase() || "";

        if (message.includes("quota") && attempt < MAX_RETRIES) {
          console.warn(`Quota issue detected. Retrying in ${RETRY_DELAY / 1000}s... (Attempt ${attempt})`);
          setTimeout(() => trySummarize(attempt + 1), RETRY_DELAY);
          return;
        }

        throw new Error(data.message || "Failed to generate summary.");
      }

      setSummary(data.summary);
    } catch (err) {
      console.error("Summarize error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (summary && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [summary]);

  return (
    <div className="text-center mt-12">
      <button
        onClick={handleSummarize}
        className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize This Story"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div
          ref={summaryRef}
          className="mt-6 bg-gray-900 p-6 rounded-xl border border-yellow-600"
        >
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">
            AI Summary:
          </h3>
          <p className="text-gray-300 text-lg text-justify">{summary}</p>
        </div>
      )}
    </div>
  );
}
