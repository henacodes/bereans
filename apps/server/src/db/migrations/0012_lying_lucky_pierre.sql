CREATE TABLE `answer_vote` (
	`user_id` text NOT NULL,
	`answer_id` text NOT NULL,
	`value` integer NOT NULL,
	PRIMARY KEY(`user_id`, `answer_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`answer_id`) REFERENCES `answer`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `question_vote` (
	`user_id` text NOT NULL,
	`question_id` text NOT NULL,
	`value` integer NOT NULL,
	PRIMARY KEY(`user_id`, `question_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON UPDATE no action ON DELETE cascade
);
