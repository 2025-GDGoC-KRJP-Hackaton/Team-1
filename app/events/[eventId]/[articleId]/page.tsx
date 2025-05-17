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
    <div className="w-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{article?.title}</h1>
        <p className="text-gray-500">{article?.description}</p>
        <p>{article?.pressOrganization}</p>
        <p>{article?.journalist}</p>
        <p>{article?.createdAt.toLocaleDateString()}</p>
      </div>
      <div> </div>
    </div>
  );
}
