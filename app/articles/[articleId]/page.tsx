import { use } from "react";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  return (
    <div>
      <div>Article {articleId}</div>
    </div>
  );
}
