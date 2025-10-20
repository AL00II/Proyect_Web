import { IsString, IsEmail, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationUserDto {
  @ApiProperty({ example: 'Alondra', description: 'Nombre del usuario', required: true,})
  @IsString()
  name: string;

  @ApiProperty({ example: 'Cortes', description: 'Apellido del usuario',required: true, })
  @IsString()
  last_name: string;

  @ApiProperty({example: 'alondra@mail.com',description: 'Correo electrónico válido',required: true,})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'MolePoblano123',description: 'Contraseña del usuario (mínimo 6 caracteres)',required: true, })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({example: 'admin',description: 'Rol del usuario',required: true,})
  @IsString()
  role: string;

  @ApiProperty({example: true,description: 'Indica si el usuario está activo',required: true,})
  @IsBoolean()
  active: boolean;
}
