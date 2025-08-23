CREATE TABLE `saved_questions` (
	`user_id` text NOT NULL,
	`question_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON UPDATE no action ON DELETE cascade
);
