import { IScheduleDetailRepository } from "../../domain/interfaces/schedule-detail.repository.interface";
import { ScheduleDetailOutput } from "../../domain/types/scheduleDetail-output.type";


export class GetScheduleDetailsBySetIdUseCase {
  constructor(private readonly repository: IScheduleDetailRepository) {}

  async execute(scheduleSetId: string): Promise<ScheduleDetailOutput[]> {
    const details = await this.repository.findByScheduleSetId(scheduleSetId);

    return details.map(detail => ({
      id: detail.id!,
      week_day: detail.week_day,
      check_in: detail.check_in,
      check_out: detail.check_out,
      lunch_start: detail.lunch_start,
      lunch_end: detail.lunch_end,
      schedules_set_id: detail.schedules_set_id,
      created_by: detail.created_by,
      updated_by: detail.updated_by,
      created_at: detail.created_at,
      updated_at: detail.updated_at,
    }));
  }
}