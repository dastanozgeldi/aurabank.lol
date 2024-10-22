import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const profilesTable = pgTable("profiles_table", {
  userId: text("user_id").primaryKey(),
  totalAura: integer("total_aura").default(0),
  username: varchar("username", { length: 20 }).unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const eventsTable = pgTable("events_table", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  aura: integer("aura").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const snitchesTable = pgTable("snitches_table", {
  id: serial("id").primaryKey(),
  culpritId: text("culprit_id").notNull(),
  victimId: text("victim_id").notNull(),
  eventId: integer("event_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const snitchesRelations = relations(snitchesTable, ({ one }) => ({
  culprit: one(profilesTable, {
    fields: [snitchesTable.culpritId],
    references: [profilesTable.userId],
  }),
  victim: one(profilesTable, {
    fields: [snitchesTable.victimId],
    references: [profilesTable.userId],
  }),
  event: one(eventsTable, {
    fields: [snitchesTable.eventId],
    references: [eventsTable.id],
  }),
}));

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertSnitch = typeof snitchesTable.$inferInsert;
export type SelectSnitch = typeof snitchesTable.$inferSelect;
