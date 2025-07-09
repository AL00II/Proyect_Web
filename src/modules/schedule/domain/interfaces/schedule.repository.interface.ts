import { ScheduleSet } from '../entities/schedule-set.entity';

export abstract class IScheduleRepository {
  abstract createScheduleSet(data: {
    name: string;
    description?: string;
    is_active?: boolean;
    created_by: string;
  }): Promise<ScheduleSet>;

  abstract updateScheduleSet(
    id: string,
    data: {
      name?: string;
      description?: string;
      is_active?: boolean;
      updated_by: string;
    },
  ): Promise<ScheduleSet>;
}
