import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateScheduleSetDto } from '../dto/create-schedule-set.dto';
import { ScheduleSet } from '../../domain/entities/schedule-set.entity';
import { ScheduleMapper } from '../../infrastructure/mappers/schedule.mapper';

@Injectable()
export class CreateScheduleSetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: CreateScheduleSetDto,
    createdBy: string,
  ): Promise<ScheduleSet> {
    const scheduleSet = await this.prisma.scheduleSet.create({
      data: {
        name: data.name,
        description: data.description,
        created_by: createdBy,
        details: {
          create: data.details.map((detail) => ({
            week_day: detail.week_day,
            check_in: detail.check_in,
            check_out: detail.check_out,
            lunch_start: detail.lunch_start,
            lunch_end: detail.lunch_end,
            created_by: createdBy,
          })),
        },
      },
      include: { details: true },
    });

    return ScheduleMapper.toDomain(scheduleSet);
  }
}
