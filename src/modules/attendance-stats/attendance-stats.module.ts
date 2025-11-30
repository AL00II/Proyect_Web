import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { AttendanceStatsController } from './infrastructure/controller/attendance-stats.controller';
import { IAttendanceStatsRepository } from './domain/interfaces/attendance-stats-repository.interface';
import { PrismaAttendanceStatsRepository } from './infrastructure/repositories/prisma-attendance-stats.repository';
import { GetEmployeeStatsUseCase } from './application/use-cases/get-employee-stats.usecase';
import { GetCompanyStatsUseCase } from './application/use-cases/get-company-stats.usecase';
import { GetAdvancedStatsUseCase } from './application/use-cases/get-advanced-stats.usecase';


@Module({
  controllers: [AttendanceStatsController],
  providers: [
    PrismaService,
    {
      provide: IAttendanceStatsRepository,
      useClass: PrismaAttendanceStatsRepository,
    },
    GetEmployeeStatsUseCase,
    GetCompanyStatsUseCase,
    GetAdvancedStatsUseCase
  ],
})
export class AttendanceStatsModule {}
