import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { eventsTable } from "./event";
import { relations } from "drizzle-orm";

export const profilesTable = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  username: varchar("username", { length: 20 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const profilesRelations = relations(profilesTable, ({ many }) => ({
  events: many(eventsTable),
}));

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
