/*
  Warnings:

  - Added the required column `image` to the `angkot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `angkot` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `fasilitas` ADD CONSTRAINT `fasilitas_id_angkot_fkey` FOREIGN KEY (`id_angkot`) REFERENCES `angkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_angkot_id_fkey` FOREIGN KEY (`angkot_id`) REFERENCES `angkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating` ADD CONSTRAINT `rating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rute` ADD CONSTRAINT `rute_id_angkot_fkey` FOREIGN KEY (`id_angkot`) REFERENCES `angkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
