import { IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsString()
  device_id: string;

  @IsString()
  created_by_id?: string | null;

  @IsString()
  token: string;
}
