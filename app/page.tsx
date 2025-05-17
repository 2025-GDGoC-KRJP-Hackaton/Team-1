import { Suspense } from "react";
import Events from "./components/events";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <h2 className="text-xl font-semibold">Events</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Events />
      </Suspense>
    </div>
  );
}
