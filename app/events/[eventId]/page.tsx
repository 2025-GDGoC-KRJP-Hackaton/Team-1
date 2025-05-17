import db from "@/db";
import { articleTable, eventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const eventPromise = db.query.eventTable.findFirst({
    where: eq(eventTable.id, Number(eventId)),
  });

  const articlesPromise = db.query.articleTable.findMany({
    where: eq(articleTable.eventId, Number(eventId)),
  });

  const [event, articles] = await Promise.all([eventPromise, articlesPromise]);

  return (
    <div className="w-full">
      <Image
        src={event?.image || "/default-event.png"}
        alt={event?.title || "Event Image"}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="p-4">
        <div className="flex flex-col p-2">
          <h1 className="text-2xl font-bold">{event?.title}</h1>
          <p className="text-gray-500">{event?.description}</p>
        </div>
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <Link
              href={`/events/${eventId}/${article.id}`}
              key={article.id}
              className="flex flex-col gap-2 bg-white p-2 rounded-md"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-500 text-sm">{article.description}</p>
              <div className="flex items-center gap-2 justify-start">
                <p>{article.pressOrganization}</p>
                <div>{article.createdAt.toLocaleDateString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
