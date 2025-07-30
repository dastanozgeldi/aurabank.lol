import {
  integer,
  timestamp,
  pgTable,
  serial,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

export const subscriptionStatuses = [
  "active",
  "canceled",
  "expired",
  "past_due",
] as const;
export type SubscriptionStatus = (typeof subscriptionStatuses)[number];
export const subscriptionStatusEnum = pgEnum(
  "subscription_status",
  subscriptionStatuses,
);

export const subscriptionsTable = pgTable("subscriptions_table", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  polarSubscriptionId: text("polar_subscription_id").unique().notNull(),
  status: subscriptionStatusEnum("status").notNull().default("active"),
  planType: text("plan_type").notNull().default("premium"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("USD"),
  createdAt: timestamp("created_at").defaultNow(),
});
