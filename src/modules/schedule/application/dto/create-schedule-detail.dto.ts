import { IsDateString, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateScheduleDetailDto {
  @IsInt()
  @Min(1)
  @Max(7)
  week_day: number;

  @IsDateString()
  check_in: string;

  @IsDateString()
  check_out: string;

  @IsOptional()
  @IsDateString()
  lunch_start?: string | null;

  @IsOptional()
  @IsDateString()
  lunch_end?: string | null;

  @IsString()
  schedules_set_id: string;
}
