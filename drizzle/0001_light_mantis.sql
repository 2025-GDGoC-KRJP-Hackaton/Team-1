CREATE TABLE "article_comparisons" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "article_comparisons_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"articleIdList" jsonb DEFAULT '[]'::jsonb,
	"commonWords" text,
	"differentOptions" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articleTable" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "articleTable" ADD COLUMN "summarized" text;