import {IsOptional,IsInt,IsDateString,IsBoolean,IsString,} from 'class-validator';

export class UpdateScheduleDetailDto {
  @IsOptional()
  @IsInt()
  week_day?: number;

  @IsOptional()
  @IsDateString()
  check_in?: Date;

  @IsOptional()
  @IsDateString()
  check_out?: Date;

  @IsOptional()
  @IsDateString()
  lunch_start?: Date;

  @IsOptional()
  @IsDateString()
  lunch_end?: Date;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  updated_by?: string;
}