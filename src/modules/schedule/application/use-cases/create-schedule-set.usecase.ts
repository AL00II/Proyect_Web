import { Injectable } from '@nestjs/common';
import { CreateScheduleSetDto } from '../dto/create-schedule-set.dto';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';

@Injectable()
export class CreateScheduleSetUseCase {
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  async execute(data: CreateScheduleSetDto, createdBy: string) {
    return this.scheduleRepository.createScheduleSet({
      ...data,
      created_by: createdBy,
      details: data.details.map((detail) => ({
        ...detail,
        created_by: createdBy,
      })),
    });
  }
}
