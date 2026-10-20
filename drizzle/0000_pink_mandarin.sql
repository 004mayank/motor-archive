CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`edition_id` text NOT NULL,
	`status` text NOT NULL,
	`provider_id` text,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaigns_edition_id_unique` ON `campaigns` (`edition_id`);--> statement-breakpoint
CREATE TABLE `claims` (
	`id` text PRIMARY KEY NOT NULL,
	`edition_id` text NOT NULL,
	`claim` text NOT NULL,
	`value` text,
	`unit` text,
	`source_id` text,
	`passage` text,
	`verified` integer DEFAULT false NOT NULL,
	`critical` integer DEFAULT false NOT NULL,
	`contradictions` text,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`vehicle_slug` text,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`url` text NOT NULL,
	`kind` text NOT NULL,
	`model_years` text NOT NULL,
	`market` text NOT NULL,
	`variant` text NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`redistributable` integer DEFAULT false NOT NULL,
	`revision` text,
	`retrieved_at` text NOT NULL,
	FOREIGN KEY (`vehicle_slug`) REFERENCES `vehicles`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `editions` (
	`id` text PRIMARY KEY NOT NULL,
	`vehicle_slug` text NOT NULL,
	`number` integer NOT NULL,
	`headline` text NOT NULL,
	`excerpt` text NOT NULL,
	`image` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`sample` integer DEFAULT false NOT NULL,
	`published_at` text,
	`created_at` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`vehicle_slug`) REFERENCES `vehicles`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `editions_number_unique` ON `editions` (`number`);--> statement-breakpoint
CREATE TABLE `image_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`vehicle_slug` text,
	`url` text NOT NULL,
	`source_url` text NOT NULL,
	`creator` text NOT NULL,
	`license` text NOT NULL,
	`license_url` text NOT NULL,
	`identity_verified` integer DEFAULT false NOT NULL,
	`rights_verified` integer DEFAULT false NOT NULL,
	`retrieved_at` text NOT NULL,
	FOREIGN KEY (`vehicle_slug`) REFERENCES `vehicles`(`slug`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`edition_id` text,
	`actor` text NOT NULL,
	`decision` text NOT NULL,
	`checks` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`idempotency_key` text NOT NULL,
	`edition_id` text,
	`mode` text NOT NULL,
	`status` text NOT NULL,
	`dry_run` integer NOT NULL,
	`rationale` text,
	`error` text,
	`cost` real DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `runs_idempotency_key_unique` ON `runs` (`idempotency_key`);--> statement-breakpoint
CREATE TABLE `sections` (
	`id` text PRIMARY KEY NOT NULL,
	`edition_id` text NOT NULL,
	`position` integer NOT NULL,
	`heading` text NOT NULL,
	`body` text NOT NULL,
	`source_id` text,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`edition_id` text NOT NULL,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`url` text NOT NULL,
	`retrieved_at` text NOT NULL,
	`kind` text NOT NULL,
	FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` text PRIMARY KEY NOT NULL,
	`run_id` text NOT NULL,
	`stage` text NOT NULL,
	`status` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`result` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`run_id`) REFERENCES `runs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `run_stage_unique` ON `steps` (`run_id`,`stage`);--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_unique` ON `subscribers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_token_unique` ON `subscribers` (`token`);--> statement-breakpoint
CREATE TABLE `vehicles` (
	`slug` text PRIMARY KEY NOT NULL,
	`identity` text NOT NULL,
	`manufacturer` text NOT NULL,
	`model` text NOT NULL,
	`generation` text NOT NULL,
	`country` text NOT NULL,
	`start_year` integer NOT NULL,
	`end_year` integer NOT NULL,
	`category` text NOT NULL,
	`body` text NOT NULL,
	`engine` text NOT NULL,
	`drivetrain` text NOT NULL,
	`fuel` text NOT NULL,
	`motorsport` integer NOT NULL,
	`significance` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicles_identity_unique` ON `vehicles` (`identity`);