import db from "@/db";
import { articleTable, eventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import SelectArticleCard from "@/app/components/select-article-card";
import { unstable_cache } from "next/cache";

const getArticles = unstable_cache(
  async (eventId: string) => {
    return await db.query.articleTable.findMany({
      where: eq(articleTable.eventId, Number(eventId)),
    });
  },
  ["articles"],
  {
    revalidate: 60,
  }
);

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

  const leftArticles = [];
  const rightArticles = [];
  const centerArticles = [];

  for (const article of articles) {
    if (article?.politicalGrade === null) {
    } else if (article?.politicalGrade && article?.politicalGrade < 0) {
      leftArticles.push(article);
    } else if (article?.politicalGrade && article?.politicalGrade > 0) {
      rightArticles.push(article);
    } else if (article?.politicalGrade === 0) {
      centerArticles.push(article);
    }
  }

  return (
    <div className="w-full flex flex-col pt-4">
      <div className="flex flex-col md:flex-row w-full mx-auto px-4">
        <Image
          src={event?.image || "/default-event.png"}
          alt={event?.title || "Event Image"}
          width={600}
          height={400}
          className="md:w-2/3 w-full h-full object-cover md:rounded-md"
        />

        <div className="flex flex-col p-2 md:justify-center md:items-center md:w-1/3">
          <h1 className="text-2xl font-bold md:text-4xl">{event?.title}</h1>
          <p className="text-gray-500 md:text-lg">{event?.description}</p>
        </div>
      </div>
      <SelectArticleCard articles={articles} prevHref={`events/${eventId}`} />
    </div>
  );
}
