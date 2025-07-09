import { Module } from '@nestjs/common';
import { ScheduleController } from './infrastructure/controllers/schedule.controller';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateScheduleSetUseCase } from './application/use-cases/create-schedule-set.usecase';

@Module({
  controllers: [ScheduleController],
  providers: [PrismaService, CreateScheduleSetUseCase],
})
export class ScheduleModule {}
