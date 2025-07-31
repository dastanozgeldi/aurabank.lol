DO $$ BEGIN
 CREATE TYPE "public"."subscription_status" AS ENUM('active', 'canceled', 'expired', 'past_due');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"aura" integer NOT NULL,
	"explanation" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles_table" (
	"user_id" text PRIMARY KEY NOT NULL,
	"total_aura" integer DEFAULT 0,
	"username" varchar(20),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "profiles_table_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "snitches_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"culprit_id" text NOT NULL,
	"victim_id" text NOT NULL,
	"event_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"polar_subscription_id" text NOT NULL,
	"status" "subscription_status" DEFAULT 'active' NOT NULL,
	"plan_type" text DEFAULT 'premium' NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"price" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "subscriptions_table_polar_subscription_id_unique" UNIQUE("polar_subscription_id")
);
