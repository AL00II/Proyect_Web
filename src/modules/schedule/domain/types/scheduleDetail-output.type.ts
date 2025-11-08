export type ScheduleDetailOutput = {
  id: string;
  week_day: number;
  check_in: Date;
  check_out: Date;
  lunch_start?: Date | null;
  lunch_end?: Date | null;
  schedules_set_id: string;
  created_at?: Date;
  created_by: string;
  updated_at?: Date | null;
  updated_by?: string | null;
};
