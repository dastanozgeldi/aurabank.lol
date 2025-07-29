import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { profilesTable } from "./profile";
import { eventsTable } from "./event";

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

export type InsertSnitch = typeof snitchesTable.$inferInsert;
export type SelectSnitch = typeof snitchesTable.$inferSelect;
