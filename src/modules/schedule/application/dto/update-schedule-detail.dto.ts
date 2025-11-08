import { IsOptional, IsDateString, IsString, IsNumber } from 'class-validator';

export class UpdateScheduleDetailDto {
  @IsOptional()
  @IsNumber()
  week_day?: number;

  
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

}
