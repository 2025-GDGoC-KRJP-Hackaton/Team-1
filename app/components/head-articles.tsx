import db from "@/db";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { eventTable } from "@/db/schema";

export default async function HeadArticles() {
  const events = await db.query.eventTable.findMany({
    limit: 10,
    orderBy: [desc(eventTable.createdAt)],
  });

  return (
    <div>
      <Link href={"/articles/1"}>Article 1</Link>
      <Link href={"/articles/2"}>Article 2</Link>
      <Link href={"/articles/3"}>Article 3</Link>
    </div>
  );
}
