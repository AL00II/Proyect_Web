import { IsNotEmpty, IsString } from 'class-validator';

export class AssignScheduleDto {
  @IsString()
  @IsNotEmpty()
  schedule_set_id: string;
}
