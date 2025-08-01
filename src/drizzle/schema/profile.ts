import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { eventsTable } from "./event";
import { relations } from "drizzle-orm";

export const profilesTable = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  name: text("name"),
  username: varchar("username", { length: 20 }).unique().notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const profilesRelations = relations(profilesTable, ({ many }) => ({
  events: many(eventsTable),
}));

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
