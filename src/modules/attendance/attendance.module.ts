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
import { IAttendanceRuleResultRepository } from './domain/interfaces/attendance-rule-result-repository.interface';
import { PrismaAttendanceRuleResultRepository } from './infrastructure/repositories/prisma-attendance-rule-result.repository';
import { RuleModule } from '../rules/rule.module';
import { EmployeeModule } from '../employee/employee.module';
import { ApplyAttendanceRulesUseCase } from './application/use-cases/evaluate-attendance-rules.usecase';
import { AttendanceRuleEvaluatorService } from './infrastructure/services/AttendanceRuleEvaluatorService';
import { IRuleRepository } from '../rules/domain/interfaces/rule.repository.interface';
import { PrismaRuleRepository } from '../rules/infrastructure/repositories/prisma.rule.repository';



@Module({
  imports: [
    DeviceModule,
    RuleModule,
    EmployeeModule,
  ],
  controllers: [AttendanceController],
  providers: [
    PrismaService,
    GetEmployeesTodayUseCase,
    RegisterAttendanceEventUseCase,
    ApplyAttendanceRulesUseCase,
    AttendanceRuleEvaluatorService,

    {
      provide: IAttendanceRepository, 
      useClass: PrismaAttendanceRepository,
    },
     {
      provide: IEmployeeRepository, 
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: IAttendanceRuleResultRepository, 
      useClass: PrismaAttendanceRuleResultRepository,
    },
    {
      provide: IRuleRepository, 
      useClass: PrismaRuleRepository,
    },
  ]
})
export class AttendanceModule {}
