export class Attendance {
  constructor(
    public readonly id: string,
    public readonly employee_id: string,
    public readonly schedule_detail_id: string,
    public readonly date: Date,
    public readonly week_day: number,
    public readonly check_in: Date | null,
    public readonly check_out: Date | null,
    public readonly lunch_start: Date | null,
    public readonly lunch_end: Date | null,
    public scheduleDetail?: any
  ) {}
}
