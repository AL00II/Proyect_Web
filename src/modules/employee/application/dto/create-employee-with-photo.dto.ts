import { IsString, IsOptional } from 'class-validator';

export class CreateEmployeeWithPhotoDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  matricula: string;

  @IsString()
  phone: string;
}
