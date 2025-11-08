import { ConflictException, Injectable } from "@nestjs/common";
import { IScheduleDetailRepository } from "../../domain/interfaces/schedule-detail.repository.interface";
import { ScheduleDetailInput } from "../../domain/types/scheduleDetail-input.type";
import { ScheduleDetailOutput } from "../../domain/types/scheduleDetail-output.type";
import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";
import { parseTimeToDate } from "../../infrastructure/utils/format-time";

@Injectable()
export class CreateScheduleDetailUseCase {
  constructor(private readonly repository: IScheduleDetailRepository) {}

 async execute(data: ScheduleDetailInput): Promise<ScheduleDetailOutput> {
  const existingDetails = await this.repository.findByScheduleSetId(data.schedules_set_id);
  const conflict = existingDetails.find(d => d.week_day === data.week_day);
  
if (conflict) {
  throw new ConflictException(`Ya existe un detalle para el día ${data.week_day} en este conjunto horario`);
}

  const entity: ScheduleDetail = {
    ...data,
    check_in: parseTimeToDate(data.check_in)!,
    check_out: parseTimeToDate(data.check_out)!,
    lunch_start: data.lunch_start ? parseTimeToDate(data.lunch_start) : null,
    lunch_end: data.lunch_end ? parseTimeToDate(data.lunch_end) : null,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
    updated_by: undefined,
  };

  const created = await this.repository.createDetail(entity);

  return {
    id: created.id!,
    week_day: created.week_day,
    check_in: created.check_in,
    check_out: created.check_out,
    lunch_start: created.lunch_start,
    lunch_end: created.lunch_end,
    schedules_set_id: created.schedules_set_id,
    created_by: created.created_by,
    created_at: created.created_at,
  };
}

}
