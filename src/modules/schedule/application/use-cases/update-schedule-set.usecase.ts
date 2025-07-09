import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { UpdateScheduleSetDto } from '../dto/update-schedule-set.dto';

@Injectable()
export class UpdateScheduleSetUseCase {
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  async execute(id: string, data: UpdateScheduleSetDto, updatedBy: string) {
    return this.scheduleRepository.updateScheduleSet(id, {
      ...data,
      updated_by: updatedBy,
    });
  }
}
