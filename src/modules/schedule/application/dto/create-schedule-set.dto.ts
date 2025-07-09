import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateScheduleSetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
