import { IsDateString, IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateScheduleDetailDto {
  @IsInt()
  week_day: number;

  @IsDateString()
  check_in: Date;

  @IsDateString()
  check_out: Date;

  @IsOptional()
  @IsDateString()
  lunch_start?: Date;

  @IsOptional()
  @IsDateString()
  lunch_end?: Date;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  schedules_set_id: string;
}
