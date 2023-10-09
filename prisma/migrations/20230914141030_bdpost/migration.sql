/*
  Warnings:

  - You are about to drop the column `img` on the `tb_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_user` DROP COLUMN `img`,
    ADD COLUMN `imgCover` LONGBLOB NULL,
    ADD COLUMN `imgPhoto` LONGBLOB NULL;

-- CreateTable
CREATE TABLE `tb_post` (
    `id_post` INTEGER NOT NULL AUTO_INCREMENT,
    `tittle` VARCHAR(50) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `createdPo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image_data` LONGBLOB NULL,

    PRIMARY KEY (`id_post`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `createdCo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_post` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_reaction` (
    `id_reaction` INTEGER NOT NULL AUTO_INCREMENT,
    `reaction` INTEGER NOT NULL DEFAULT 1,
    `id_post` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_reaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_post` ADD CONSTRAINT `tb_post_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_comment` ADD CONSTRAINT `tb_comment_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `tb_post`(`id_post`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_comment` ADD CONSTRAINT `tb_comment_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_reaction` ADD CONSTRAINT `tb_reaction_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `tb_post`(`id_post`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_reaction` ADD CONSTRAINT `tb_reaction_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
