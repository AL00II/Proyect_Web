
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CreateEmployeeDto } from '../../application/dto/create-employee.dto';
import { EmployeeOutput } from '../../domain/types/employee-output';
import { CreateEmployeeUseCase } from '../../application/use-cases/create-employee.use-case';
import { GetEmployeeByMatriculaUseCase } from '../../application/use-cases/get-employee-by-matricula.use-case';
import { UpdateEmployeeDto } from '../../application/dto/update-employee.dto';
import { UpdateEmployeeUseCase } from '../../application/use-cases/update-employee.usecase';
import { DeleteEmployeeUseCase } from '../../application/use-cases/delete-employee.usecase';
import { AssignScheduleToEmployeeUseCase } from '../../application/use-cases/assign-schedule.usecase';
import { AssignScheduleDto } from '../../application/dto/assign-schedule.dto';
import { GetAllEmployeesUseCase } from '../../application/use-cases/get-all-employees.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeeWithPhotoDto } from '../../application/dto/create-employee-with-photo.dto';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getEmployeeByMtricula: GetEmployeeByMatriculaUseCase,
    private readonly getAllEmployeesUseCase: GetAllEmployeesUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private readonly assignScheduleUseCase: AssignScheduleToEmployeeUseCase
  ) {}

  @Post('create')
  async create(
    @Body() dto: CreateEmployeeDto,
    @Req() req: Request & { user: { sub: string } }
  ): Promise<EmployeeOutput> {
    const userId = req.user.sub; 
    return await this.createEmployeeUseCase.execute(dto, userId);
  }

  @Get(':matricula')
  async getByMatricula(@Param('matricula') matricula: string): Promise<EmployeeOutput> {
    return await this.getEmployeeByMtricula.execute(matricula);
  }

  @Get()
   async getAll(): Promise<EmployeeOutput[]> {
   return await this.getAllEmployeesUseCase.execute();
  }

  @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() dto: UpdateEmployeeDto,
      @Req() req: Request & { user: { sub: string } },
    ) {
      const updated_by_id = req.user.sub;
      return this.updateEmployeeUseCase.execute(id, { ...dto, updated_by_id });
    }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const msg = await this.deleteEmployeeUseCase.execute(id);
    return { message: msg };
  }


  @Patch(':id/assign-schedule')
  async assignSchedule(
    @Param('id') id: string,
    @Body() dto: AssignScheduleDto,
    @Req() req: Request
  ) {
    const userId = req.user.sub; 
    const result = await this.assignScheduleUseCase.execute(id, dto.schedule_set_id, userId);
    return { success: result };
  }

}


