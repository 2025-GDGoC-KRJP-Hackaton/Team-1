"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const articles = searchParams.get("articles");

  useEffect(() => {
    const fetchAnalysis = async () => {
      const response = await fetch("/api/article/analysis", {
        method: "POST",
        body: JSON.stringify({ articleIds: articles?.split(",").map(Number) }),
      });
      const data = await response.json();
      console.log(data);
      console.log(JSON.parse(data.result));
    };
    fetchAnalysis();
  }, [articles]);

  return <div>ArticlesPage</div>;
}
