import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const eventTable = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const eventRelations = relations(eventTable, ({ many }) => ({
  articles: many(articleTable),
}));

export const articleTable = pgTable("articleTable", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description"),
  originalUrl: text("originalUrl"),
  image: text("image"),
  content: text("content"),
  pressOrganization: text("press_organization").notNull(),
  journalist: text("journalist").notNull(),
  eventId: integer("event_id").references(() => eventTable.id),
  politicalGrade: integer("political_grade"),
  summarized: text("summarized"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const articleRelations = relations(articleTable, ({ one }) => ({
  author: one(eventTable, {
    fields: [articleTable.eventId],
    references: [eventTable.id],
  }),
}));

export const articleComparisonTable = pgTable("article_comparisons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  articleIdList: text("articleIdList").notNull().unique(),
  commonOpinions: jsonb().$type<string[]>().default([]),
  differentOppinions: jsonb().$type<string[][]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
