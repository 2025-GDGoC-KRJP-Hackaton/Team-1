import db from "@/db";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { eventTable } from "@/db/schema";

export default async function Events() {
  const events = await db.query.eventTable.findMany({
    limit: 10,
    orderBy: [desc(eventTable.createdAt)],
  });

  console.log(events);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Events</h2>
      <div className="flex flex-col gap-2">
        {events.map((eventData) => {
          return (
            <Link href={`/articles/${eventData.id}`} key={eventData.id}>
              {eventData.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
