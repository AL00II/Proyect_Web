export class AttendanceResponseDto {
  employee_id: string;
  name: string;

  schedule_detail: {
    id: string;
    check_in: string | null;
    check_out: string | null;
    lunch_start: string | null;
    lunch_end: string | null;
  };

  attendance: {
    check_in: Date | null;
    lunch_start: Date | null;
    lunch_end: Date | null;
    check_out: Date | null;
  };
}
