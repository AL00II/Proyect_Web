import { Injectable } from '@nestjs/common';
import { IScheduleDetailRepository } from '../../domain/interfaces/schedule-detail.repository.interface';
import { ScheduleDetailOutput } from '../../domain/types/scheduleDetail-output.type';
import { ScheduleDetailUpdateInput } from '../../domain/types/scheduleDetail-update-input.type';
import { parseTimeToDate } from '../../infrastructure/utils/format-time';

@Injectable()
export class UpdateScheduleDetailUseCase {
  constructor(
    private readonly scheduleDetailRepository: IScheduleDetailRepository
  ) {}

  async execute( id: string, data: ScheduleDetailUpdateInput): Promise<ScheduleDetailOutput> {

    const updatedData = {
       week_day: data.week_day,
      check_in: data.check_in ? parseTimeToDate(data.check_in) : undefined,
      check_out: data.check_out ? parseTimeToDate(data.check_out) : undefined,
      lunch_start: data.lunch_start ? parseTimeToDate(data.lunch_start) : null,
      lunch_end: data.lunch_end ? parseTimeToDate(data.lunch_end) : null,
      schedules_set_id: data.schedules_set_id,
      updated_by: data.updated_by,
    };

    const updated = await this.scheduleDetailRepository.updateDetail(id, updatedData as any);



    return {
      id: updated.id!,
      week_day: updated.week_day,
      check_in: updated.check_in,
      check_out: updated.check_out,
      lunch_start: updated.lunch_start,
      lunch_end: updated.lunch_end,
      schedules_set_id: updated.schedules_set_id,
      created_by: updated.created_by,
      updated_by: updated.updated_by,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  }
}
