import SelectArticleCard from "@/app/components/select-article-card";
import db from "@/db";
import { articleTable, eventTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

async function getArticles(eventId: string) {
  const articlesPromise = await db.query.articleTable.findMany({
    where: eq(articleTable.eventId, Number(eventId)),
  });
  return articlesPromise;
}

export type Article = Awaited<ReturnType<typeof getArticles>>[number];
function ArticleHorizontalScrollCard({
  articles,
  eventId,
}: {
  articles: Awaited<ReturnType<typeof getArticles>>;
  eventId: string;
}) {
  return (
    <>
      {articles.length > 0 && (
        <div className="w-full overflow-x-auto snap-proximity snap-x lg:overflow-x-visible lg:snap-none lg:grid-cols-2 lg:flex-1">
          <div className="flex gap-4 w-max p-4 lg:flex lg:flex-col lg:w-auto lg:p-0">
            {articles.map((article) => (
              <Link
                href={`/events/${eventId}/${article.id}`}
                key={article.id}
                className="flex-shrink-0 flex flex-col gap-2 bg-white p-2 rounded-md w-[90vw] snap-center lg:w-auto"
              >
                <h3 className="text-lg font-semibold p-1">{article.title}</h3>
                <p className="text-gray-500 text-sm p-1">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 justify-start">
                  <p>{article.pressOrganization}</p>
                  <div>{article.createdAt.toLocaleDateString()}</div>
                </div>
                <div>
                  <p>0</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

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
        <SelectArticleCard articles={articles} />
      </div>
    </div>
  );
}
