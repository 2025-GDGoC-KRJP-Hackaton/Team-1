ALTER TABLE "article_comparisons" ALTER COLUMN "articleIdList" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "article_comparisons" ALTER COLUMN "articleIdList" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article_comparisons" ALTER COLUMN "articleIdList" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "article_comparisons" ADD CONSTRAINT "article_comparisons_articleIdList_unique" UNIQUE("articleIdList");