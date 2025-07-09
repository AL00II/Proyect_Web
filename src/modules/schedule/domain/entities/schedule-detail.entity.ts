export class ScheduleDetail {
  constructor(
    public id: string,
    public week_day: number,
    public check_in: Date,
    public check_out: Date,
    public lunch_start: Date | null,
    public lunch_end: Date | null,
    public is_active: boolean,
    public schedules_set_id: string,
  ) {}
}
