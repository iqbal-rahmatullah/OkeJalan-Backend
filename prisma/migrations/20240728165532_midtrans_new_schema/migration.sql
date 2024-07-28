/*
  Warnings:

  - You are about to drop the column `response_midtrans` on the `payment` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `snap_token` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `response_midtrans`,
    ADD COLUMN `snap_token` TEXT NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;
