import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { IEmployeeRepository } from './domain/interfaces/employee-repository.interface';
import { PrismaEmployeeRepository } from './infrastructure/repositories/employee.repository';
import { EmployeeController } from './infrastructure/controllers/employee.controller';
import { GetEmployeeByMatriculaUseCase } from './application/use-cases/get-employee-by-matricula.use-case';
import { CreateEmployeeUseCase } from './application/use-cases/create-employee.use-case';
import { GetAllEmployeesUseCase } from './application/use-cases/get-all-employees.use-case';

@Module({
    controllers: [EmployeeController],
    providers: [
    PrismaService,
    CreateEmployeeUseCase,
    GetEmployeeByMatriculaUseCase,
    GetAllEmployeesUseCase,

    {
       provide: IEmployeeRepository, 
       useClass: PrismaEmployeeRepository,
    },
  ],
  exports: [
    IEmployeeRepository,
    CreateEmployeeUseCase,
    GetEmployeeByMatriculaUseCase,
    GetAllEmployeesUseCase
  ],})
export class EmployeeModule {}
