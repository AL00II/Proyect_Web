import { Inject, Injectable } from '@nestjs/common';
import { IDScheduleRepository } from '../../domain/interfaces/schedule-details-interface';
import { ScheduleDetail } from '../../domain/entities/schedule-detail.entity';

@Injectable()
export class CreateScheduleDetailUseCase {
  constructor(
    @Inject('IDScheduleRepository')
    private readonly repository: IDScheduleRepository,
  ) {}

  async execute(data: {
    week_day: number;
    check_in: Date;
    check_out: Date;
    lunch_start?: Date;
    lunch_end?: Date;
    is_active: boolean;
    schedules_set_id: string;
    created_by: string;
  }): Promise<ScheduleDetail> {
    const detail = new ScheduleDetail(
      '', 
      data.week_day,
      data.check_in,
      data.check_out,
      data.lunch_start || null,
      data.lunch_end || null,
      data.is_active,
      data.schedules_set_id,
      data.created_by,
      null,
    );

    return this.repository.create(detail);
  }
}
