import { ScheduleDetail } from "../entities/schedule-detail.entity";


export abstract class IScheduleDetailRepository {
  abstract createDetail(detail: ScheduleDetail): Promise<ScheduleDetail>;
  abstract findByScheduleSetId(scheduleSetId: string): Promise<ScheduleDetail[]>;
  abstract updateDetail(id: string, data: Partial<ScheduleDetail>): Promise<ScheduleDetail>;
  abstract  deleteDetail(id: string): Promise<string>;
}


