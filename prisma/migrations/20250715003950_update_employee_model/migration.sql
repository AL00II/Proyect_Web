/*
  Warnings:

  - You are about to drop the column `full_proto` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `ideal_vector` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attendancetype` table. If the table is not empty, all the data it contains will be lost.

*/

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `full_proto`,
    DROP COLUMN `ideal_vector`,
    ADD COLUMN `URL_photo` VARCHAR(191) NULL,
    ADD COLUMN `facial_vector` VARCHAR(191) NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Attendance`;

-- DropTable
DROP TABLE `AttendanceType`;

