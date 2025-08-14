ALTER TABLE `questions` RENAME TO `question`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_question` (
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
--> statement-breakpoint
INSERT INTO `__new_question`("id", "user_id", "book_id", "chapter", "verse_start", "verse_end", "title", "text", "created_at", "updated_at", "upvotes", "downvotes") SELECT "id", "user_id", "book_id", "chapter", "verse_start", "verse_end", "title", "text", "created_at", "updated_at", "upvotes", "downvotes" FROM `question`;--> statement-breakpoint
DROP TABLE `question`;--> statement-breakpoint
ALTER TABLE `__new_question` RENAME TO `question`;--> statement-breakpoint
PRAGMA foreign_keys=ON;