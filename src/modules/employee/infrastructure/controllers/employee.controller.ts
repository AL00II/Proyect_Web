
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateEmployeeDto } from '../../application/dto/create-employee.dto';
import { EmployeeOutput } from '../../domain/types/employee-output';
import { CreateEmployeeUseCase } from '../../application/use-cases/create-employee.use-case';
import { GetEmployeeByMatriculaUseCase } from '../../application/use-cases/get-employee-by-matricula.use-case';
import { GetAllEmployeesUseCase } from '../../application/use-cases/get-all-employees.use-case';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getEmployeeByMtricula: GetEmployeeByMatriculaUseCase,
    private readonly getAllEmployeesUseCase: GetAllEmployeesUseCase,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateEmployeeDto, @Req() req: Request): Promise<EmployeeOutput> {
    const userId = req.user.sub;
    return await this.createEmployeeUseCase.execute(dto, userId);
  }

  @Get('employee/:matricula')
  async getByMatricula(@Param('matricula') matricula: string): Promise<EmployeeOutput> {
    return await this.getEmployeeByMtricula.execute(matricula);
  }

  @Get()
   async getAll(): Promise<EmployeeOutput[]> {
   return await this.getAllEmployeesUseCase.execute();
   }
}
