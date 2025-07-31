import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { profilesTable } from "./profile";

export const eventsTable = pgTable("events_table", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  aura: integer("aura").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventsRelations = relations(eventsTable, ({ one }) => ({
  profile: one(profilesTable, {
    fields: [eventsTable.userId],
    references: [profilesTable.userId],
  }),
}));

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
