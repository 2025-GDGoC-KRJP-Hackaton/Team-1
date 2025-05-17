import { Suspense } from "react";
import Events from "./components/events";

export default function HomePage() {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold">Events</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Events />
      </Suspense>
    </div>
  );
}
