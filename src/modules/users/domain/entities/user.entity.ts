import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 'Alondra', description: 'Nombre del usuario', required: true })
  public name: string;

  @ApiProperty({ example: 'Cortes', description: 'Apellido del usuario', required: true })
  public last_name: string;

  @ApiProperty({ example: 'alondra@mail.com', description: 'Correo electrónico del usuario', required: true })
  public email: string;

  @ApiProperty({ example: 'hashed_password123', description: 'Contraseña encriptada', required: true })
  public password: string;

  @ApiProperty({ example: 'admin', description: 'Rol del usuario (ejemplo: admin, user)', required: true })
  public role: string;

  @ApiProperty({ example: true, description: 'Estado del usuario', required: true })
  public active: boolean;

  @ApiProperty({ example: 'uuid-5678', description: 'Identificador único del usuario' })
  public readonly id?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'Fecha de creación del usuario' })
  public  created_at?: Date;

  @ApiProperty({ example: '2025-01-02T00:00:00.000Z', description: 'Fecha de actualización del usuario' })
  public readonly updated_at?: Date;

  constructor(
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    active: boolean,
    id?: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.active = active;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
