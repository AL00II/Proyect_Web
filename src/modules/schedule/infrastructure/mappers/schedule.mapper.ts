import { ScheduleDetail } from '../../domain/entities/schedule-detail.entity';
import { ScheduleSet } from '../../domain/entities/schedule-set.entity';

export class ScheduleMapper {
  static toDomain(raw: any): ScheduleSet {
    return new ScheduleSet(
      raw.id,
      raw.name,
      raw.description,
      raw.is_active,
      raw.created_by,
      raw.created_at,
      raw.updated_at,
      raw.details?.map(
        (detail) =>
          new ScheduleDetail(
            detail.id,
            detail.week_day,
            detail.check_in,
            detail.check_out,
            detail.lunch_start,
            detail.lunch_end,
            detail.is_active,
            detail.schedules_set_id,
          ),
      ),
    );
  }
}
