import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controllers/schedule.controller';
import { CreateScheduleSetUseCase } from './application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetUseCase } from './application/use-cases/update-schedule-set-usecase';
import { ScheduleRepository } from './infrastructure/repositories/schedule.repository';
import { IScheduleRepository } from './domain/interfaces/schedule.repository.interface';
import { PrismaService } from 'src/core/database/prisma.service';
import { GetAllScheduleSetsUseCase } from './application/use-cases/get-all-ScheduleSet.usecase';
import { GetByIScheduleSetdUseCase } from './application/use-cases/getby-Id-schedule-set.usecase';
import { DeleteScheduleSetUseCase } from './application/use-cases/delete-schedule-set.usecase';

@Module({
  controllers: [ScheduleController],
  providers: [
    PrismaService,
    CreateScheduleSetUseCase,
    UpdateScheduleSetUseCase,
    GetAllScheduleSetsUseCase,
    GetByIScheduleSetdUseCase,
    DeleteScheduleSetUseCase,
    {
      provide: IScheduleRepository,
      useClass: ScheduleRepository,
    },
  ],
})
export class ScheduleModule {}
