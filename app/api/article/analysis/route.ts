import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import db from "@/db";
import { articleTable } from "@/db/schema";
import { inArray } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { articleIds } = (await request.json()) as { articleIds: number[] };

  const articles = await db.query.articleTable.findMany({
    where: inArray(articleTable.id, articleIds),
  });

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
  });
  const config = {
    responseMimeType: "application/json",
  };
  const model = "gemini-2.5-pro-preview-05-06";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `
          Read all articles neutrally and objectively, without any value judgment.

You’ll receive 2 or 3 news links about the same event from different perspectives.

Extract shared facts neutrally and store them in commonOpinions.

For each article, summarize its unique perspective in up to 5 short sentences. Store each summary in differentOpinions.

Return your response in JSON only:

{
"commonOpinions": [...],
"differentOpinions": [
[...],
[...],
[...]
]
}
          ${JSON.stringify(articles.map((article) => article.originalUrl))}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  const result = [];
  for await (const chunk of response) {
    result.push(chunk.text);
  }

  return NextResponse.json({ result: result.join("") });
}
