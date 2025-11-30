export class DateHelper {

  /** Primer día de la semana (Lunes) */
  static getWeekRange(date: Date) {
    const d = new Date(date);
    const day = d.getDay() || 7;

    const monday = new Date(d);
    monday.setDate(d.getDate() - (day - 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { start: monday, end: sunday };
  }

  /** Primer y último día del mes */
  static getMonthRange(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }

  /** Día completo */
  static getDayRange(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }
}
