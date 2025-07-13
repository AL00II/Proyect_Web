import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { ScheduleSetOutput } from '../../domain/types/scheduleSet-output.type';

@Injectable()
export class GetAllScheduleSetsUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute(): Promise<ScheduleSetOutput[]> {
    return this.repository.findAll();
  }
}
