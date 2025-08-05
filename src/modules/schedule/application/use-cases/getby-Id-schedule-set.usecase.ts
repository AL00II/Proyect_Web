import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { ScheduleSetOutput } from '../../domain/types/scheduleSet-output.type';
@Injectable()
export class GetByIScheduleSetdUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute(id: string): Promise<ScheduleSetOutput | null> {
    return this.repository.findById(id);
  }
}
