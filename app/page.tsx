import { Suspense } from "react";
import Events from "./components/events";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <h2 className="text-xl font-semibold">Events</h2>
      <Suspense
        fallback={
          <>
            <div className="w-full h-60 bg-neutral-200 rounded-lg animate-pulse"></div>
            <div className="w-full h-60 bg-neutral-200 rounded-lg animate-pulse"></div>
            <div className="w-full h-60 bg-neutral-200 rounded-lg animate-pulse"></div>
          </>
        }
      >
        <Events />
      </Suspense>
    </div>
  );
}
