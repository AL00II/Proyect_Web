import { ScheduleSet } from '../entities/schedule-set.entity';

export abstract class IScheduleRepository {
  abstract createScheduleSet(data: {
    name: string;
    description?: string;
    created_by: string;
    details: Array<{
      week_day: number;
      check_in: Date;
      check_out: Date;
      lunch_start?: Date;
      lunch_end?: Date;
      created_by: string;
    }>;
  }): Promise<ScheduleSet>;

  abstract updateScheduleSet(
    id: string,
    data: {
      name?: string;
      description?: string;
      updated_by: string;
      details?: Array<{
        week_day?: number;
        check_in?: Date;
        check_out?: Date;
        lunch_start?: Date;
        lunch_end?: Date;
      }>;
    },
  ): Promise<ScheduleSet>;
}
