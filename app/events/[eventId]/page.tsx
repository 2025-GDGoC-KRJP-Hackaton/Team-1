import SelectArticleCard from "@/app/components/select-article-card";
import db from "@/db";
import { articleTable, eventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

async function getArticles(eventId: string) {
  const articlesPromise = await db.query.articleTable.findMany({
    where: eq(articleTable.eventId, Number(eventId)),
  });
  return articlesPromise;
}

export type Article = Awaited<ReturnType<typeof getArticles>>[number];

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const eventPromise = db.query.eventTable.findFirst({
    where: eq(eventTable.id, Number(eventId)),
  });

  const articlesPromise = getArticles(eventId);

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
      <div className="">
        <div className="flex flex-col p-2">
          <h1 className="text-2xl font-bold">{event?.title}</h1>
          <p className="text-gray-500">{event?.description}</p>
        </div>
        <SelectArticleCard prevHref={`events/${eventId}`} articles={articles} />
      </div>
    </div>
  );
}
