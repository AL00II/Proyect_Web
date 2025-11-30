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
      record.lunch_end,


      record.schedule_detail ? {
        id: record.schedule_detail.id,
        week_day: record.schedule_detail.week_day,
        check_in: record.schedule_detail.check_in,
        check_out: record.schedule_detail.check_out,
        lunch_start: record.schedule_detail.lunch_start,
        lunch_end: record.schedule_detail.lunch_end
      } : null
    );
  }
}
