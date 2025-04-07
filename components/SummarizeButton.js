"use client";

import { useState } from "react";


export default function SummarizeButton({ storyText }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!storyText || storyText.trim() === "") {
      setError("No story content found to summarize.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: storyText }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mt-6 bg-gray-900 p-6 rounded-xl border border-yellow-600">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">AI Summary:</h3>
          <p className="text-gray-300">{summary}</p>
        </div>
      )}
    </div>
  );
}
