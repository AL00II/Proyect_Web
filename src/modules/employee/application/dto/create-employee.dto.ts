import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  matricula: string;

  @IsString()
  phone: string;

  @IsOptional()
  facial_vector: string | null;

  @IsOptional()
  URL_photo: string | null;

  @IsBoolean()
  active: boolean;
}
