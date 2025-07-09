import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateScheduleSetDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
