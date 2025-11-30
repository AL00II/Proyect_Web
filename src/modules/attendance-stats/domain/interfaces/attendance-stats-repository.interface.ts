import { AttendanceStat } from "../entities/attendance-stat.entity";
import { AttendanceStatsInput } from "../types/attendance-stats.input";

export abstract class IAttendanceStatsRepository {
  abstract getEmployeeStats(input: AttendanceStatsInput): Promise<AttendanceStat[]>;
  abstract getCompanyStats(input: AttendanceStatsInput): Promise<AttendanceStat[]>;
}
