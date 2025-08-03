/*
  Warnings:

  - You are about to drop the column `updated_by` on the `employee` table. All the data in the column will be lost.

*/


-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `updated_by`,
    ADD COLUMN `updated_by_id` VARCHAR(191) NULL;


-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_updated_by_id_fkey` FOREIGN KEY (`updated_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
