import { Suspense } from "react";
import StoriesPage from "@/components/StoriesPage";

export const metadata = {
  title: 'Stories | Digital Museum',
  description: 'Explore the Digital Museum of Untold Stories, a platform for sharing and preserving cultural narratives.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading stories...</div>}>
      <StoriesPage />
    </Suspense>
  );
}
