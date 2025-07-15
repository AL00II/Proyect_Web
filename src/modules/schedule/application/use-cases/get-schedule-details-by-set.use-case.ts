import { Inject, Injectable } from '@nestjs/common';
import { IDScheduleRepository } from '../../domain/interfaces/schedule-details-interface';
import { ScheduleDetail } from '../../domain/entities/schedule-detail.entity';

@Injectable()
export class GetScheduleDetailsBySetUseCase {
  constructor(
    @Inject('IDScheduleRepository')
    private readonly repository: IDScheduleRepository,
  ) {}

  async execute(scheduleSetId: string): Promise<ScheduleDetail[]> {
    return this.repository.findByScheduleSetId(scheduleSetId);
  }
}
