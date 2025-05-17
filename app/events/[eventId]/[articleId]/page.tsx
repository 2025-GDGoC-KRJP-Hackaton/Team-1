import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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
    <div>
      <div>{article?.title}</div>
    </div>
  );
}
