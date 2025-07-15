import { UpdateScheduleDetailDto } from '../../application/dto/update-schedule-detail.dto';
import { ScheduleDetail } from '../entities/schedule-detail.entity';

export abstract class IDScheduleRepository {
  abstract create(detail: ScheduleDetail): Promise<ScheduleDetail>;
  abstract findByScheduleSetId(scheduleSetId: string): Promise<ScheduleDetail[]>;
  abstract update(id: string, dto: UpdateScheduleDetailDto): Promise<ScheduleDetail | null>;
 // abstract delete(id: string): Promise<boolean>;

}
