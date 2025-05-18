import { Article } from "../events/[eventId]/page";
import Link from "next/link";

function ArticleHorizontalScrollCard({
  articles,
  prevHref,
}: {
  articles: Article[];
  prevHref: string;
}) {
  return (
    <>
      {articles.length > 0 && (
        <div className="w-full overflow-x-auto snap-mandatory snap-x lg:overflow-x-visible lg:snap-none lg:flex-1">
          <div className="flex gap-4 w-max p-4 lg:w-auto lg:flex-col lg:p-0 lg:pt-4">
            {articles.map((article) => (
              <Link
                href={`/${prevHref}/${article.id}`}
                key={article.id}
                className="flex-shrink-0 flex flex-col gap-2 bg-white p-2 rounded-md w-[90vw] snap-center lg:w-auto lg:h-80 lg:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold p-1 line-clamp-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm p-1 line-clamp-6">
                    {article.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 justify-start">
                    <p>{article.pressOrganization}</p>
                    <div>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="w-full h-4 rounded-full flex items-center justify-between bg-neutral-200/80">
                      <div
                        className={`${
                          -3 === article.politicalGrade && "bg-blue-700"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          -2 === article.politicalGrade && "bg-blue-500"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          -1 === article.politicalGrade && "bg-blue-300"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          0 === article.politicalGrade && "bg-green-600"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          1 === article.politicalGrade && "bg-red-300"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          2 === article.politicalGrade && "bg-red-500"
                        } w-full h-4 rounded-full`}
                      />
                      <div
                        className={`${
                          3 === article.politicalGrade && "bg-red-700"
                        } w-full h-4 rounded-full`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>Left</div>
                      <div>Right</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function SelectArticleCard({
  articles,
  prevHref,
}: {
  articles: (Article | undefined)[];
  prevHref: string;
}) {
  const leftArticles = [];
  const rightArticles = [];
  const centerArticles = [];

  for (const article of articles) {
    if (article?.politicalGrade === null) {
      continue;
    } else if (article?.politicalGrade && article?.politicalGrade < 0) {
      leftArticles.push(article);
    } else if (article?.politicalGrade && article?.politicalGrade > 0) {
      rightArticles.push(article);
    } else if (article?.politicalGrade === 0) {
      centerArticles.push(article);
    }
  }

  return (
    <div className="lg:flex lg:gap-4">
      <ArticleHorizontalScrollCard
        articles={leftArticles}
        prevHref={prevHref}
      />
      <ArticleHorizontalScrollCard
        articles={centerArticles}
        prevHref={prevHref}
      />
      <ArticleHorizontalScrollCard
        articles={rightArticles}
        prevHref={prevHref}
      />
    </div>
  );
}
