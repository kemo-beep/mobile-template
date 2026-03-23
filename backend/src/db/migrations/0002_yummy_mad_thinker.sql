CREATE TABLE "app_store_connections" (
	"id" text PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"store" text NOT NULL,
	"credentials" text,
	"last_sync_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_store_rankings" (
	"id" text PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"store" text NOT NULL,
	"date" timestamp NOT NULL,
	"category" text,
	"rank" text NOT NULL,
	"country" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_store_reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"store" text NOT NULL,
	"external_id" text NOT NULL,
	"rating" text NOT NULL,
	"body" text,
	"author" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_store_connections" ADD CONSTRAINT "app_store_connections_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_rankings" ADD CONSTRAINT "app_store_rankings_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app_store_reviews" ADD CONSTRAINT "app_store_reviews_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE cascade ON UPDATE no action;