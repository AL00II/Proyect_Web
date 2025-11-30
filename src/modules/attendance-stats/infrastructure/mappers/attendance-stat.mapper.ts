import { AttendanceStat } from "../../domain/entities/attendance-stat.entity";
import { AttendanceRuleResult } from "src/modules/attendance/domain/entities/attendance-rule-result.entity";

export class AttendanceStatMapper {

  static toEmployeeStats(results: AttendanceRuleResult[]): AttendanceStat[] {
  const statsMap = new Map<string, AttendanceStat>();

  results.forEach(r => {
    const key = r.employeeId + "_" + r.createdAt.toISOString().split("T")[0];

    if (!statsMap.has(key)) {
      statsMap.set(
        key,
        new AttendanceStat(
          r.employeeId,
          r.createdAt,
          r.createdAt,
          0, 0, 0, 0,  // check-in
          0, 0, 0, 0,  // lunch
          r.employeeName ?? null, 
          r.employeePhoto ?? null  
        )
      );
    }

    const stat = statsMap.get(key)!;

    // --- Check-in ---
    switch (r.statusIn) {
      case "on_time": stat.checkInOnTime += 1; break;
      case "late": stat.checkInLate += 1; break;
      case "early": stat.checkInEarly += 1; break;
      case "absent": stat.checkInAbsent += 1; break;
    }

    // --- Lunch ---
    switch (r.statusLunch) {
      case "on_time": stat.lunchOnTime += 1; break;
      case "late": stat.lunchLate += 1; break;
      case "early": stat.lunchEarly += 1; break;
      case "not_returned": stat.lunchNotReturned += 1; break;
    }
  });

  return Array.from(statsMap.values());
}


  static groupByPeriod(stats: AttendanceStat[], period: "week" | "month"): Record<string, AttendanceStat[]> {
    const grouped: Record<string, AttendanceStat[]> = {};

    stats.forEach(s => {
      const date = new Date(s.date);
      let key = "";

      if (period === "week") {
        const week = AttendanceStatMapper.getWeekNumber(date);
        key = `${date.getFullYear()}-W${week}`;
      } else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(s);
    });

    return grouped;
  }

  static getWeekNumber(d: Date) {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayNum = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayNum);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
