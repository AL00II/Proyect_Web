import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controllers/schedule.controller';
import { CreateScheduleSetUseCase } from './application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetUseCase } from './application/use-cases/update-schedule-set-usecase';
import { ScheduleRepository } from './infrastructure/repositories/schedule.repository';
import { IScheduleRepository } from './domain/interfaces/schedule.repository.interface';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [ScheduleController],
  providers: [
    PrismaService,
    CreateScheduleSetUseCase,
    UpdateScheduleSetUseCase,
    {
      provide: IScheduleRepository,
      useClass: ScheduleRepository,
    },
  ],
})
export class ScheduleModule {}
