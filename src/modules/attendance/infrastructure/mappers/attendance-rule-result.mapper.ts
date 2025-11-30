import { AttendanceRuleResult } from "../../domain/entities/attendance-rule-result.entity";

export class AttendanceRuleResultMapper {
  static toDomain(record: any) {
    return new AttendanceRuleResult(
      record.id,
      record.employee_id,
      record.attendanceId,
      record.rule_in_id,
      record.rule_lunch_id,
      record.status_in,
      record.minutes_late_in,
      record.status_lunch,
      record.minutes_late_lunch,
      record.createdAt,
    );
  }
}
