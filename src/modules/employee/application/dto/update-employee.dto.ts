import { IsOptional, IsString, IsBoolean } from 'class-validator';


export class UpdateEmployeeDto {
@IsOptional()
@IsString()
name?: string;


@IsOptional()
@IsString()
last_name?: string;


@IsOptional()
@IsString()
matricula?: string;


@IsOptional()
@IsString()
phone?: string;


@IsOptional()
@IsString()
facial_vector?: number[] | null | string;


@IsOptional()
@IsString()
URL_photo?: string | null;


@IsOptional()
@IsBoolean()
active?: boolean;


@IsOptional()
@IsString()
updated_by_id: string;
}