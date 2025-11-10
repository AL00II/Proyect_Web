import { Employee } from 'generated/prisma';
import { ScheduleSet } from '../entities/schedule-set.entity';
import { ScheduleSetOutput } from '../types/scheduleSet-output.type';

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
  abstract findAll(): Promise<ScheduleSetOutput[]>;
  abstract findById(id: string): Promise<ScheduleSetOutput | null>;
  abstract hasDetails(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract findEmployees(scheduleSetId: string): Promise<Employee[]>;

}
