import { Module } from '@nestjs/common';
import { PrismaService } from '../:./../../core/database/prisma.service';
import { IEmployeeRepository } from './domain/interfaces/employee-repository.interface';
import { PrismaEmployeeRepository } from './infrastructure/repositories/employee.repository';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { GetEmployeeByMatriculaUseCase } from './application/use-cases/get-employee-by-matricula.use-case';
import { CreateEmployeeUseCase } from './application/use-cases/create-employee.use-case';
import { GetAllEmployeesUseCase } from './application/use-cases/get-all-employees.use-case';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeUseCase } from './application/use-cases/update-employee.usecase';
import { DeleteEmployeeUseCase } from './application/use-cases/delete-employee.usecase';
import { AssignScheduleToEmployeeUseCase } from './application/use-cases/assign-schedule.usecase';
import { IScheduleRepository } from '../schedule/domain/interfaces/schedule.repository.interface';
import { ScheduleRepository } from '../schedule/infrastructure/repositories/schedule.repository';

@Module({
    controllers: [EmployeeController],
    providers: [
    PrismaService,
    CreateEmployeeUseCase,
    GetEmployeeByMatriculaUseCase,
    GetAllEmployeesUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    AssignScheduleToEmployeeUseCase,
    {
      provide: IEmployeeRepository, 
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: IScheduleRepository,
      useClass: ScheduleRepository
      ,
    },
    EmployeeService,
  ],
  exports: [
    IEmployeeRepository,
    CreateEmployeeUseCase,
    GetEmployeeByMatriculaUseCase,
    GetAllEmployeesUseCase
  ],})
export class EmployeeModule {}
