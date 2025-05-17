import { NextRequest } from "next/server";
import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;

  if (!articleId) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const readContents = searchParams.get("read")?.split(",");
  const article = await db.query.articleTable.findFirst({
    where: eq(articleTable.id, Number(articleId)),
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article, { status: 200 });
}
