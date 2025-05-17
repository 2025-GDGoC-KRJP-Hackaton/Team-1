import SelectArticleCard from "@/app/components/select-article-card";
import db from "@/db";
import { articleTable } from "@/db/schema";
import { inArray,  notInArray } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";


export default async function ArticlePage({
  params,
}: {
  params: Promise<{ eventId: string; articleId: string[] }>;
}) {
  const { eventId, articleId } = await params;

  const articles = await db.query.articleTable.findMany({
    where: inArray(articleTable.id, articleId.map(Number)),
  });

  let otherArticles = await db.query.articleTable.findMany({
    where: notInArray(articleTable.id, articleId.map(Number)),
  });

  for (const article of articles) {
    if (typeof article.politicalGrade === "number") {
      if (article.politicalGrade > 0) {
        otherArticles = otherArticles.filter(
          (otherArticle) =>
            typeof otherArticle.politicalGrade === "number" &&
            otherArticle.politicalGrade <= 0
        );
      }
      if (article.politicalGrade < 0) {
        otherArticles = otherArticles.filter(
          (otherArticle) =>
            typeof otherArticle.politicalGrade === "number" &&
            otherArticle.politicalGrade >= 0
        );
      }
      if (article.politicalGrade === 0) {
        otherArticles = otherArticles.filter(
          (otherArticle) =>
            typeof otherArticle.politicalGrade === "number" &&
            otherArticle.politicalGrade !== 0
        );
      }
    }
  }

  console.log(`events/${eventId}/${articleId.join("/")}`);

  const thisArticle = articles[articleId.length - 1];
  return (
    <div className="w-full flex flex-col gap-2">
      <Image
        src={thisArticle?.image || "/default-article.png"}
        alt={thisArticle?.title || "Article Image"}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">{thisArticle?.title}</h1>
        <div className="flex items-center gap-2">
          <p>{thisArticle?.pressOrganization}</p>
          <p>{thisArticle?.createdAt.toLocaleDateString()}</p>
        </div>
        <p>{thisArticle?.journalist}</p>
      </div>
      <div className="p-4">{thisArticle?.content}</div>
      {articleId.length === 1 && (
        <div>
          <SelectArticleCard
            articles={otherArticles}
            prevHref={`events/${eventId}/${thisArticle?.id}`}
          />
        </div>
      )}
      {articleId.length === 2 && (
        <div>
          <SelectArticleCard
            articles={otherArticles}
            prevHref={`events/${eventId}/${articleId[0]}/${thisArticle?.id}`}
          />
        </div>
      )}
      {otherArticles.length === 0 && (
        <div className="p-4 w-full flex justify-center">
          <Link
            href={`/analysis?articles=${articleId.join(",")}`}
            className="p-2 bg-neutral-900 rounded-md text-white text-center w-full"
          >
            Compare news articles
          </Link>
        </div>
      )}
    </div>
  );
}
