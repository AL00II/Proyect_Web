import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controllers/schedule.controller';
import { CreateScheduleSetUseCase } from './application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetUseCase } from './application/use-cases/update-schedule-set-usecase';
import { ScheduleRepository } from './infrastructure/repositories/schedule.repository';
import { IScheduleRepository } from './domain/interfaces/schedule.repository.interface';
import { PrismaService } from 'src/core/database/prisma.service';
import { ScheduleDetailsController } from './infrastructure/controllers/schedule-details.controller';
import { CreateScheduleDetailUseCase } from './application/use-cases/create-schedule-detail.use-case';
import { DetailsRepo } from './infrastructure/repositories/schudule-details-repository';
import { GetScheduleDetailsBySetUseCase } from './application/use-cases/get-schedule-details-by-set.use-case';
import { UpdateScheduleDetailUseCase } from './application/use-cases/update-schedule-detail.use-case';


@Module({
  controllers: [
    ScheduleController,
    ScheduleDetailsController, 
  ],
  providers: [
    PrismaService,
    CreateScheduleSetUseCase,
    UpdateScheduleSetUseCase,
    CreateScheduleDetailUseCase,
    GetScheduleDetailsBySetUseCase,
    UpdateScheduleDetailUseCase,
   // DeleteScheduleDetailUseCase,
   
    {
      provide: IScheduleRepository,
      useClass: ScheduleRepository,
    },
    {
      provide: 'IDScheduleRepository',
      useClass: DetailsRepo,
    },
  ],
})
export class ScheduleModule {}