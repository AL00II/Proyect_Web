import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AbsenceStatus, AbsenceType } from './absence.types.dto';

export class UpdateAbsenceDto {
  @IsOptional()
  @IsEnum(AbsenceType)
  type?: AbsenceType;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsEnum(AbsenceStatus)
  status?: AbsenceStatus;
}
