import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Alondra', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Cortes', description: 'Apellido del usuario' })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ example: 'alondra@mail.com', description: 'Correo electrónico válido' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'ChalupasVerdes456', description: 'Nueva contraseña' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'user', description: 'Rol del usuario' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ example: false, description: 'Indica si el usuario está activo' })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
