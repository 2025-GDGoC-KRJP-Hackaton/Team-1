import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const article = await db.query.articleTable.findFirst({
    where: eq(articleTable.id, Number(articleId)),
  });

  return (
    <div className="w-full">
      <Image
        src={article?.image || "/default-article.png"}
        alt={article?.title || "Article Image"}
        width={600}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">{article?.title}</h1>
        <div className="flex items-center gap-2">
          <p>{article?.pressOrganization}</p>
          <p>{article?.createdAt.toLocaleDateString()}</p>
        </div>
        <p>{article?.journalist}</p>
      </div>
      <div>{article?.content}</div>
    </div>
  );
}
