export class ScheduleDetail {
  constructor(
    public week_day: number,
    public check_in: Date,
    public check_out: Date,
    public schedules_set_id: string,
    public created_by: string,
    public created_at?: Date,
    public lunch_start?: Date | null,
    public lunch_end?: Date | null,
    public id?: string,
    public updated_at?: Date | null,
    public updated_by?: string | null,
  ) {}
}
