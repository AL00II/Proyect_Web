import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({example: 'MolePoblano123',description: 'Contraseña actual del usuario',required: true,})
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'ChilesEnNogada456',description: 'Nueva contraseña del usuario (mínimo 6 caracteres)',required: true,
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
