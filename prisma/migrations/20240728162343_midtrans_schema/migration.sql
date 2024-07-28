/*
  Warnings:

  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `method` on the `payment` table. All the data in the column will be lost.
  - Added the required column `response_midtrans` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `method`,
    ADD COLUMN `response_midtrans` TEXT NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
