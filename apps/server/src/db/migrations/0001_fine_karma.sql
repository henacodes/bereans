CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`book_id` integer NOT NULL,
	`chapter` integer NOT NULL,
	`verse_start` integer NOT NULL,
	`verse_end` integer NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer DEFAULT now NOT NULL,
	`updated_at` integer NOT NULL,
	`upvotes` integer DEFAULT 0 NOT NULL,
	`downvotes` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
