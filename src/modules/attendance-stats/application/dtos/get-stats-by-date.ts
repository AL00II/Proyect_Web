import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class AttendanceRangeDto {
    @IsNotEmpty()
    employeeId?: string;

    @IsNotEmpty()
    @IsDateString()
    start: string;

    @IsNotEmpty()
    @IsDateString()
    end: string;
}
