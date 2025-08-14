import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateRuleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly valid?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isGlobal?: boolean;

  @IsOptional()
  @IsString()
  readonly employeeId?: string | null;
}
