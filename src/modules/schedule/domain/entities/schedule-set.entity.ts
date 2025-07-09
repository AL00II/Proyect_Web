import { ScheduleDetail } from './schedule-detail.entity';

export class ScheduleSet {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public is_active: boolean,
    public created_by: string,
    public created_at: Date,
    public updated_at: Date | null,
    public details?: ScheduleDetail[],
  ) {}
}
