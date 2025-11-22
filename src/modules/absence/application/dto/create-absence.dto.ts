import { Type } from 'class-transformer';
import { IsDateString, IsString, IsOptional, IsEnum } from 'class-validator';
import { AbsenceType } from './absence.types.dto';

export class CreateAbsenceDto {
  @IsString()
  employeeId!: string;

  @IsOptional()
  @IsString()
  scheduleDetailId?: string;

  @IsEnum(AbsenceType)
  type!: AbsenceType;

  @IsDateString()
  @Type(() => Date)
  startDate!: Date;

  @IsDateString()
  @Type(() => Date)
  endDate!: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
