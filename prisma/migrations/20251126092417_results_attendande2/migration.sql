/*
  Warnings:

  - You are about to drop the `attendance_rule_results` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `absences_created_by_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_employee_id_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_schedule_detail_id_fkey` ON `absences`;

-- DropIndex
DROP INDEX `absences_updated_by_fkey` ON `absences`;

-- DropTable
DROP TABLE `attendance_rule_results`;

-- CreateTable
CREATE TABLE `AttendanceRuleResult` (
    `id` VARCHAR(191) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,
    `attendanceId` VARCHAR(191) NOT NULL,
    `rule_in_id` VARCHAR(191) NULL,
    `rule_lunch_id` VARCHAR(191) NULL,
    `status_in` VARCHAR(191) NULL,
    `minutes_late_in` INTEGER NULL,
    `status_lunch` VARCHAR(191) NULL,
    `minutes_late_lunch` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AttendanceRuleResult_attendanceId_key`(`attendanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `AttendanceRuleResult` ADD CONSTRAINT `AttendanceRuleResult_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceRuleResult` ADD CONSTRAINT `AttendanceRuleResult_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceRuleResult` ADD CONSTRAINT `AttendanceRuleResult_rule_in_id_fkey` FOREIGN KEY (`rule_in_id`) REFERENCES `rules`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceRuleResult` ADD CONSTRAINT `AttendanceRuleResult_rule_lunch_id_fkey` FOREIGN KEY (`rule_lunch_id`) REFERENCES `rules`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
