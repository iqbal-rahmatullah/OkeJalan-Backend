/*
  Warnings:

  - You are about to drop the column `is_new` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `is_new`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_new` BOOLEAN NOT NULL DEFAULT true;
