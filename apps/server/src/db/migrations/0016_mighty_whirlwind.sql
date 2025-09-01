CREATE TABLE `citation` (
	`id` text PRIMARY KEY NOT NULL,
	`answer_id` text NOT NULL,
	`cited_by` text NOT NULL,
	`title` text NOT NULL,
	`author` text,
	`url` text,
	`type` text NOT NULL,
	`context` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`answer_id`) REFERENCES `answer`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cited_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
