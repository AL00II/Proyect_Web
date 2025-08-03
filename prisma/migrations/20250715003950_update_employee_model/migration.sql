/*
  Warnings:

  - You are about to drop the column `full_proto` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `ideal_vector` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attendancetype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Employee_created_by_id_fkey` ON `Employee`;

-- DropIndex
DROP INDEX `rules_created_by_id_fkey` ON `Rules`;

-- DropIndex
DROP INDEX `rules_employee_id_fkey` ON `Rules`;

-- DropIndex
DROP INDEX `ScheduleDetail_schedules_set_id_fkey` ON `Scheduledetail`;

-- DropIndex
DROP INDEX `ScheduleSet_created_by_fkey` ON `Scheduleset`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `full_proto`,
    DROP COLUMN `ideal_vector`,
    ADD COLUMN `URL_photo` VARCHAR(191) NULL,
    ADD COLUMN `facial_vector` VARCHAR(191) NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `attendance`;

-- DropTable
DROP TABLE `attendancetype`;

-- AddForeignKey
ALTER TABLE `ScheduleSet` ADD CONSTRAINT `ScheduleSet_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleDetail` ADD CONSTRAINT `ScheduleDetail_schedules_set_id_fkey` FOREIGN KEY (`schedules_set_id`) REFERENCES `ScheduleSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
