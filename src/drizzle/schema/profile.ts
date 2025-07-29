import {
  integer,
  pgTable,
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

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
