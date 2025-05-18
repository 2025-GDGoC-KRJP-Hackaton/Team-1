import { Article } from "@/app/events/[eventId]/page";

/**
 * Sort articles to left, right, and center
 * @param articles - articles to sort
 * @returns sorted articles
 */
export default function sortArticles(articles: Article[]) {
  const leftArticles = [];
  const rightArticles = [];
  const centerArticles = [];

  for (const article of articles) {
    if (article?.politicalGrade === null) {
    } else if (article?.politicalGrade && article?.politicalGrade < 0) {
      leftArticles.push(article);
    } else if (article?.politicalGrade && article?.politicalGrade > 0) {
      rightArticles.push(article);
    } else if (article?.politicalGrade === 0) {
      centerArticles.push(article);
    }
  }
  return {
    leftArticles,
    rightArticles,
    centerArticles,
  };
}
