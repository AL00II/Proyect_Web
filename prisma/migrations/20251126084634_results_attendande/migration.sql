/*
  Warnings:

  - You are about to drop the column `createdAt` on the `attendance_rule_results` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `absences_created_by_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_employee_id_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_schedule_detail_id_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_updated_by_fkey` ON `absences`;

-- DropIndex
DROP INDEX `attendance_rule_results_attendanceId_fkey` ON `attendance_rule_results`;

-- AlterTable
ALTER TABLE `attendance_rule_results` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `ScheduleSet` ADD CONSTRAINT `ScheduleSet_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleDetail` ADD CONSTRAINT `ScheduleDetail_schedules_set_id_fkey` FOREIGN KEY (`schedules_set_id`) REFERENCES `ScheduleSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_schedule_set_id_fkey` FOREIGN KEY (`schedule_set_id`) REFERENCES `ScheduleSet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_updated_by_id_fkey` FOREIGN KEY (`updated_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_schedule_detail_id_fkey` FOREIGN KEY (`schedule_detail_id`) REFERENCES `ScheduleDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_schedule_detail_id_fkey` FOREIGN KEY (`schedule_detail_id`) REFERENCES `ScheduleDetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absences` ADD CONSTRAINT `absences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_rule_results` ADD CONSTRAINT `attendance_rule_results_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_rule_results` ADD CONSTRAINT `attendance_rule_results_rule_id_fkey` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_rule_results` ADD CONSTRAINT `attendance_rule_results_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
