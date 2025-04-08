import { Suspense } from "react";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-white text-center text-xl p-12">Loading Museum...</div>}>
      <HomePage />
    </Suspense>
  );
}
