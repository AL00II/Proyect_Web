import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  matricula: string;

  @IsOptional()
  @IsString()
  facial_vector: string | null;

  @IsOptional()
  @IsString()
  URL_photo: string | null;

  @IsBoolean()
  active: boolean;
}