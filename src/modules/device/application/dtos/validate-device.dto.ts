import { IsString } from 'class-validator';

export class ValidateDeviceDto {
  @IsString()
  device_id: string;

  @IsString()
  token: string;
}
