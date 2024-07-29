/*
  Warnings:

  - A unique constraint covering the columns `[snap_token]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `payment` MODIFY `snap_token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `payment_snap_token_key` ON `payment`(`snap_token`);
