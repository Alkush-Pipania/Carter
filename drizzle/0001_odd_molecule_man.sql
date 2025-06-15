ALTER TABLE "user" ADD COLUMN "subscription" text DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credit" integer DEFAULT 10 NOT NULL;