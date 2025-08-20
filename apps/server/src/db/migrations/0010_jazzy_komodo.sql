CREATE TABLE `answer_vote` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`answer_id` text NOT NULL,
	`value` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`answer_id`) REFERENCES `answer`(`id`) ON UPDATE no action ON DELETE cascade
);
