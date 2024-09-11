import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events_table", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  aura: integer("aura").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
