"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function Loading() {
  return (
    <p className="p-2 rounded-lg bg-neutral-200 animate-pulse">
      Analyzing articles with Gemini…
    </p>
  );
}

function Analysis() {
  const searchParams = useSearchParams();
  const articles = searchParams.get("articles");

  const [common, setCommon] = useState<string[]>([]);
  const [different, setDifferent] = useState<string[][]>([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const response = await fetch("/api/article/analysis", {
        method: "POST",
        body: JSON.stringify({ articleIds: articles?.split(",").map(Number) }),
      });
      const data = await response.json();
      console.log(data);
      if (data?.differentOpinions) {
        setCommon(data.commonOpinions);
      }
      if (data?.differentOpinions) {
        setDifferent(data.differentOpinions);
      }
    };
    fetchAnalysis();
  }, [articles]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2 bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold">Common Opinions</h2>
        {common.map((data, i) => (
          <p key={i}>- {data}</p>
        ))}
        {common.length === 0 && <Loading />}
      </div>
      <div className="flex flex-col gap-2 bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold">Different Opinions</h2>
        <div className="flex gap-6 flex-col">
          {different.map((data, i) => (
            <div key={i} className="ring-2 p-2 rounded-md flex flex-col gap-2">
              {data.map((item, j) => (
                <p key={j}>- {item}</p>
              ))}
            </div>
          ))}
          {different.length === 0 && <Loading />}
        </div>
      </div>
      <Link
        href={"/"}
        className="p-2 rounded-md text-center bg-neutral-900 text-white"
      >
        Back to Events
      </Link>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense>
      <Analysis />
    </Suspense>
  );
}
