import { IsString, IsNotEmpty, IsOptional, IsBoolean, Matches } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre no ingresado' })
  @Matches(/\S/, { message: 'El nombre no puede estar vacío o solo con espacios' })
  name: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly valid?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isGlobal?: boolean;

  @IsString()
  @IsOptional()
  readonly employeeId?: string;
}
