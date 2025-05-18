import db from "@/db";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { eventTable } from "@/db/schema";
import Image from "next/image";
import { unstable_cache } from "next/cache";

const getEvents = unstable_cache(
  async () =>
    await db.query.eventTable.findMany({
      limit: 10,
      orderBy: [desc(eventTable.createdAt)],
    }),
  ["events"],
  {
    revalidate: 60,
  }
);

export default async function Events() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3">
      {events.map((eventData) => {
        return (
          <Link
            href={`/events/${eventData.id}`}
            key={eventData.id}
            className="flex flex-col gap-2 bg-white"
          >
            <Image
              src={eventData.image || "/default-event.png"}
              alt={eventData.title}
              width={600}
              height={400}
              className="w-full object-cover rounded-t-md aspect-5/3"
            />
            <div className="flex flex-col px-2 pb-2">
              <h3 className="text-lg font-semibold">{eventData.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {eventData.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
