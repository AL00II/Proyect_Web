/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Employee_created_by_id_fkey` ON `employee`;

-- DropIndex
DROP INDEX `Employee_updated_by_id_fkey` ON `employee`;

-- DropIndex
DROP INDEX `rules_created_by_id_fkey` ON `rules`;

-- DropIndex
DROP INDEX `rules_employee_id_fkey` ON `rules`;

-- DropIndex
DROP INDEX `ScheduleDetail_schedules_set_id_fkey` ON `scheduledetail`;

-- DropIndex
DROP INDEX `ScheduleSet_created_by_fkey` ON `scheduleset`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_phone_key` ON `Employee`(`phone`);

-- AddForeignKey
ALTER TABLE `ScheduleSet` ADD CONSTRAINT `ScheduleSet_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleDetail` ADD CONSTRAINT `ScheduleDetail_schedules_set_id_fkey` FOREIGN KEY (`schedules_set_id`) REFERENCES `ScheduleSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_updated_by_id_fkey` FOREIGN KEY (`updated_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
