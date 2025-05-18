import { Article } from "../events/[eventId]/page";
import sortArticles from "@/lib/sort-articles";
import { ArticleHorizontalScrollCard } from "@/app/components/article-horizontal-scroll-card";

export default function SelectArticleCard({
  articles,
  prevHref,
}: {
  articles: Article[];
  prevHref: string;
}) {
  const { leftArticles, rightArticles, centerArticles } =
    sortArticles(articles);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
