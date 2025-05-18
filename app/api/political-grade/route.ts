import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { revalidateTag } from "next/cache";

export async function POST() {
  // Get all ungraded articles
  const ungradedArticles = await db.query.articleTable.findMany({
    where: isNull(articleTable.politicalGrade),
  });
  // Initialize Google GenAI
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
  });
  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      required: ["1_political_grade", "2_description", "3_summary"],
      properties: {
        "1_political_grade": {
          type: Type.STRING,
          description:
            "Ranking on a -3 to 3 scale where negative number is more politically left and positive number politically right. If the article is neutral, rate it as 0. Please rate it in detail according to the political context and tendencies of each country.",
        },
        "2_description": {
          type: Type.STRING,
          description: "Describe the article in 1 sentence",
        },
        "3_summary": {
          type: Type.STRING,
          description: "Briefly summarize the article",
        },
      },
    },
  };
  // Use Gemini 2.5 Pro Preview model
  const model = "gemini-2.5-pro-preview-05-06";
  // Grade each article
  for (const article of ungradedArticles) {
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: article.content!,
          },
        ],
      },
    ];

    // Generate content stream
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    const result = [];
    for await (const chunk of response) {
      result.push(chunk.text);
    }
    const parsedResult = JSON.parse(result.join(""));

    // Update the article with the parsed result
    await db
      .update(articleTable)
      .set({
        politicalGrade: parsedResult["1_political_grade"],
        description: parsedResult["2_description"],
        summarized: parsedResult["3_summary"],
      })
      .where(eq(articleTable.id, article.id));
  }

  // Revalidate the articles cache
  revalidateTag("articles");

  // Return success response
  return NextResponse.json({ result: "success" });
}
