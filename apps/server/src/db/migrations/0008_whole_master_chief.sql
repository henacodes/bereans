ALTER TABLE `answer` ADD `approved` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `question` DROP COLUMN `approved`;