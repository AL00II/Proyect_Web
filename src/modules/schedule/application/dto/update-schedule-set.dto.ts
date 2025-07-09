import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateScheduleDetailDto {
  @IsOptional()
  week_day?: number;

  @IsOptional()
  check_in?: Date;

  @IsOptional()
  check_out?: Date;

  @IsOptional()
  lunch_start?: Date;

  @IsOptional()
  lunch_end?: Date;
}

export class UpdateScheduleSetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateScheduleDetailDto)
  details?: UpdateScheduleDetailDto[];
}
