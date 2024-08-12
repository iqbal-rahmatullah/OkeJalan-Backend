-- CreateTable
CREATE TABLE `user_voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `voucher_id` INTEGER NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nominal` INTEGER NOT NULL,
    `min_nominal` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
