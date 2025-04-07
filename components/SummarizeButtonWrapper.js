"use client";

import dynamic from "next/dynamic";

// Dynamically import SummarizeButton on the client side
const SummarizeButton = dynamic(() => import("./SummarizeButton"), { ssr: false });

export default function SummarizeButtonWrapper({ storyText }) {
  return <SummarizeButton storyText={storyText} />;
}
