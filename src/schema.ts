import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const profile = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  totalAura: integer("total_aura").default(0),
});

export const events = pgTable("events_table", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  aura: integer("aura").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertProfile = typeof profile.$inferInsert;
export type SelectProfile = typeof profile.$inferSelect;

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
