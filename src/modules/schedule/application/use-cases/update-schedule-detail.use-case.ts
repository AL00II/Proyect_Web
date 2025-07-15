import { Inject, Injectable } from '@nestjs/common';
import { IDScheduleRepository } from '../../domain/interfaces/schedule-details-interface';
import { ScheduleDetail } from '../../domain/entities/schedule-detail.entity';
import { UpdateScheduleDetailDto } from '../dto/update-schedule-detail.dto';

@Injectable()
export class UpdateScheduleDetailUseCase {
  constructor(
    @Inject('IDScheduleRepository') 
    private readonly repository: IDScheduleRepository,
  ) {}

  async execute(id: string, dto: UpdateScheduleDetailDto): Promise<ScheduleDetail | null> {
    return await this.repository.update(id, dto);
  }
}
