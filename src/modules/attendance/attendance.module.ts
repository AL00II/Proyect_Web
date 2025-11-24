import { Module } from '@nestjs/common';
import { AttendanceController } from './infrastructure/controller/attendance.controller';
import { PrismaService } from 'src/core/database/prisma.service';
import { IAttendanceRepository } from './domain/interfaces/attendance-repository.interface';
import { PrismaAttendanceRepository } from './infrastructure/repositories/attendance.repository';
import { GetEmployeesTodayUseCase } from './application/use-cases/get-today-attendance.usecase';
import { RegisterAttendanceEventUseCase } from './application/use-cases/register-attendance.usecase';
import { IEmployeeRepository } from '../employee/domain/interfaces/employee-repository.interface';
import { PrismaEmployeeRepository } from '../employee/infrastructure/repositories/employee.repository';
import { DeviceModule } from '../device/decive.module';



@Module({
  imports: [
    DeviceModule,
  ],
  controllers: [AttendanceController],
  providers: [
    PrismaService,
    GetEmployeesTodayUseCase,
    RegisterAttendanceEventUseCase,
    {
      provide: IAttendanceRepository, 
      useClass: PrismaAttendanceRepository,
    },
     {
      provide: IEmployeeRepository, 
      useClass: PrismaEmployeeRepository,
    },
  ]
})
export class AttendanceModule {}
