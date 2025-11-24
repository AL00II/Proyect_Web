export type AttendanceTodayResult = {
  employee_id: string;
  name: string;
  facial_vector: number[] | null;     
  photo: string | null;               
  schedule_detail: {
    id: string;
    week_day: number;
    check_in: Date;
    check_out: Date;
    lunch_start: Date | null;
    lunch_end: Date | null;
  };
  attendance: {
    check_in: Date | null;
    lunch_start: Date | null;
    lunch_end: Date | null;
    check_out: Date | null;
  };
};
