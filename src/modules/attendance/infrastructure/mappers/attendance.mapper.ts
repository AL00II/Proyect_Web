import { Attendance } from "../../domain/entities/attendance.entity";

export class AttendanceMapper {
  static toEntity(record: any): Attendance {
    return new Attendance(
      record.id,
      record.employee_id,
      record.schedule_detail_id,
      record.date,
      record.week_day,
      record.check_in,
      record.check_out,
      record.lunch_start,
      record.lunch_end
    );
  }
}
