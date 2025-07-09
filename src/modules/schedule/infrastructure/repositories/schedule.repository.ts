import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { IScheduleRepository } from '../../domain/interfaces/schedule.depository.interface';
import { ScheduleSet } from '../../domain/entities/schedule-set.entity';

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createScheduleSet(data: any): Promise<ScheduleSet> {
    return this.prisma.scheduleSet.create({
      data: {
        name: data.name,
        description: data.description,
        created_by: data.created_by,
        details: {
          create: data.details.map((detail) => ({
            week_day: detail.week_day,
            check_in: detail.check_in,
            check_out: detail.check_out,
            lunch_start: detail.lunch_start,
            lunch_end: detail.lunch_end,
            created_by: detail.created_by,
          })),
        },
      },
      include: { details: true },
    });
  }
}
