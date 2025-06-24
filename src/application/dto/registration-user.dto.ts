import { IsString, IsEmail, IsBoolean, MinLength } from 'class-validator';

export class RegistrationUserDto {

  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsBoolean()
  active: boolean;
}
