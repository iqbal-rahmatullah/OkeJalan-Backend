/*
  Warnings:

  - Added the required column `transaction_id` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rating` ADD COLUMN `transaction_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
