import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controllers/schedule.controller';
import { CreateScheduleSetUseCase } from './application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetUseCase } from './application/use-cases/update-schedule-set-usecase';
import { ScheduleRepository } from './infrastructure/repositories/schedule.repository';
import { ScheduleDetailRepository } from './infrastructure/repositories/schedule-detail.repository';
import { IScheduleRepository } from './domain/interfaces/schedule.repository.interface';
import { IScheduleDetailRepository } from './domain/interfaces/schedule-detail.repository.interface';
import { PrismaService } from '../../core/database/prisma.service';
import { GetAllScheduleSetsUseCase } from './application/use-cases/get-all-ScheduleSet.usecase';
import { GetByIScheduleSetdUseCase } from './application/use-cases/getby-Id-schedule-set.usecase';
import { DeleteScheduleSetUseCase } from './application/use-cases/delete-schedule-set.usecase';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDetailUseCase } from './application/use-cases/create-schedule-detail.usecase';
import { UpdateScheduleDetailUseCase } from './application/use-cases/update-schedule-detail.usecase';
import { DeleteScheduleDetailUseCase } from './application/use-cases/delete-schedule-detail.usecase';
import { ScheduleDetailsController } from './infrastructure/controllers/schedule-details.controller';
import { GetScheduleDetailsBySetIdUseCase } from './application/use-cases/get-schedule-details-by-set.usecase';
import { GetEmployeesByScheduleSetUseCase } from './application/use-cases/get-employees-by-schedule-set.usecase';

@Module({
  controllers: [ScheduleController, ScheduleDetailsController],
  providers: [
    PrismaService,
    CreateScheduleSetUseCase,
    UpdateScheduleSetUseCase,
    GetAllScheduleSetsUseCase,
    GetByIScheduleSetdUseCase,
    DeleteScheduleSetUseCase,
    CreateScheduleDetailUseCase,
    UpdateScheduleDetailUseCase,
    DeleteScheduleDetailUseCase,
    GetScheduleDetailsBySetIdUseCase,
    GetEmployeesByScheduleSetUseCase,
    {
      provide: IScheduleRepository,
      useClass: ScheduleRepository,
    },
    {
      provide: IScheduleDetailRepository,
      useClass: ScheduleDetailRepository,
    },
    ScheduleService,
  ],
})
export class ScheduleModule {}
