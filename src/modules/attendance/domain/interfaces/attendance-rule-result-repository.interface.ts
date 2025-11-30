import { AttendanceRuleResult } from "../entities/attendance-rule-result.entity";

export abstract class IAttendanceRuleResultRepository {
  abstract findByAttendanceId(attendanceId: string): Promise<AttendanceRuleResult | null>;

  abstract createOrUpdate(data: {
    attendanceId: string;
    employeeId: string;

    ruleInId?: string | null;
    statusIn?: string | null;
    minutesLateIn?: number | null;

    ruleLunchId?: string | null;
    statusLunch?: string | null;
    minutesLateLunch?: number | null;
  }): Promise<AttendanceRuleResult>;
}
