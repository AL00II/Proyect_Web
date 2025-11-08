
export type ScheduleDetailInput = {
  week_day: number;
  check_in: string | null | undefined;
  check_out: string | null | undefined;
  lunch_start?: string | null;
  lunch_end?: string | null;
  schedules_set_id: string;
  created_by: string;
  created_at?: Date;
  updated_by?: string;
};