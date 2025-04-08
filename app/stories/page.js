import { Suspense } from "react";
import StoriesPage from "@/components/StoriesPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading stories...</div>}>
      <StoriesPage />
    </Suspense>
  );
}
