import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleDetailDto {
  @IsNotEmpty()
  week_day: number;

  @IsNotEmpty()
  check_in: Date;

  @IsNotEmpty()
  check_out: Date;

  @IsOptional()
  lunch_start?: Date;

  @IsOptional()
  lunch_end?: Date;
}

export class CreateScheduleSetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDetailDto)
  details: ScheduleDetailDto[];
}
