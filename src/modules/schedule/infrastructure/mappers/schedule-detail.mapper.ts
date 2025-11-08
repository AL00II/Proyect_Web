import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";

export class ScheduleDetailMapper {
  static toEntity(prismaDetail: any): ScheduleDetail {
    return new ScheduleDetail(
        prismaDetail.week_day,
        prismaDetail.check_in,
        prismaDetail.check_out,
        prismaDetail.schedules_set_id,
        prismaDetail.created_by,
        prismaDetail.created_at,
        prismaDetail.lunch_start ?? null,
        prismaDetail.lunch_end ?? null,
        prismaDetail.id,
        prismaDetail.updated_at ?? null,
        prismaDetail.updated_by ?? null,
    );
  }
}
