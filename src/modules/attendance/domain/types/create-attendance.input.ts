export type CreateAttendanceInput = {
  employee_id: string;
  schedule_detail_id: string;
  date: Date;
  week_day: number;
  check_in?: Date | null;
  lunch_start?: Date | null;
  lunch_end?: Date | null;
  check_out?: Date | null;
};