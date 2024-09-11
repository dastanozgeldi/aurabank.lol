import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  totalAura: integer("total_aura").default(0),
  username: varchar("username", { length: 20 }).unique(),
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

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
