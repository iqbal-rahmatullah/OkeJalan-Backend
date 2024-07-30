-- AlterTable
ALTER TABLE `transaction` MODIFY `status` ENUM('done', 'on_going', 'pending') NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_tujuan_id_fkey` FOREIGN KEY (`tujuan_id`) REFERENCES `rute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_asal_id_fkey` FOREIGN KEY (`asal_id`) REFERENCES `rute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
