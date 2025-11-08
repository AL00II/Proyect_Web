export type ScheduleDetailUpdateInput = {
  week_day?: number;
  check_in: string | null | undefined;
  check_out: string | null | undefined;
  lunch_start?: string | null;
  lunch_end?: string | null;
  schedules_set_id?: string;
  updated_by: string;
};
