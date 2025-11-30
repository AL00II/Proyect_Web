import { AttendanceStat } from "../entities/attendance-stat.entity";

export class StatsHelper {
  static groupByPeriod(stats: AttendanceStat[], period: "week" | "month") {
    const grouped: Record<string, AttendanceStat[]> = {};

    stats.forEach(s => {
      const date = new Date(s.date);
      let key = "";

      if (period === "week") {
        const week = StatsHelper.getWeekNumber(date);
        key = `${date.getFullYear()}-W${week}`;
      } else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(s);
    });

    return grouped;
  }

  private static getWeekNumber(d: Date) {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayNum = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayNum);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
