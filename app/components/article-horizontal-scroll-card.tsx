import { Article } from "@/app/events/[eventId]/page";
import Link from "next/link";
import PoliticalGradeBar from "@/app/components/political-grade-bar";

export function ArticleHorizontalScrollCard({
  articles,
  prevHref,
}: {
  articles: Article[];
  prevHref: string;
}) {
  return (
    <div className="w-full">
      {articles.length > 0 && (
        <div className="w-full overflow-x-auto snap-proximity snap-x">
          <div className="flex gap-4 w-max p-4 md:flex-col ">
            {articles.map((article) => (
              <Link
                href={`/${prevHref}/${article.id}`}
                key={article.id}
                className="flex flex-col gap-2 bg-white p-2 rounded-md w-[90vw] md:w-62 lg:w-64 snap-center"
              >
                <h3 className="text-lg font-semibold p-1">{article.title}</h3>
                <p className="text-gray-500 text-sm p-1">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 justify-start">
                  <p>{article.pressOrganization}</p>
                  <div>{new Date(article.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <PoliticalGradeBar grade={article.politicalGrade!} />
                  <div className="flex items-center justify-between">
                    <div>Left</div>
                    <div>Right</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
