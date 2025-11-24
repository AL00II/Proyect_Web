import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateAbsenceUseCase } from '../../application/use-cases/create-absence.use-case';
import { UpdateAbsenceUseCase } from '../../application/use-cases/update-absence.use-case';
import { DeleteAbsenceUseCase } from '../../application/use-cases/delete-absence.use-case';
import { GetAbsenceByIdUseCase } from '../../application/use-cases/get-absence-by-id-use-case';
import { GetAbsencesByEmployeeUseCase } from '../../application/use-cases/get-absence-by-employee-use-use';
import { GetAbsencesByStatusUseCase } from '../../application/use-cases/get-absence-by-status.use-case';
import { GetAllAbsencesUseCase } from '../../application/use-cases/get-all-absencese.use-case';
import { CreateAbsenceDto } from '../../application/dto/create-absence.dto';
import { UpdateAbsenceDto } from '../../application/dto/update-absence.dto';
import { AbsenceMapper } from '../mappers/absence.mapper';

@Controller('absences')
export class AbsenceController {
  constructor(
    private readonly createAbsenceUseCase: CreateAbsenceUseCase,
    private readonly updateAbsenceUseCase: UpdateAbsenceUseCase,
    private readonly deleteAbsenceUseCase: DeleteAbsenceUseCase,
    private readonly getAbsenceByIdUseCase: GetAbsenceByIdUseCase,
    private readonly getAbsencesByEmployeeUseCase: GetAbsencesByEmployeeUseCase,
    private readonly getAbsencesByStatusUseCase: GetAbsencesByStatusUseCase,
    private readonly getAllAbsencesUseCase: GetAllAbsencesUseCase,
  ) {}

  @Post('create')
  async create(
    @Body() createAbsenceDto: CreateAbsenceDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    const userId = req.user.sub;
    const absence = await this.createAbsenceUseCase.execute(
      createAbsenceDto,
      userId,
    );
    return AbsenceMapper.toResponse(absence);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAbsenceDto: UpdateAbsenceDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    const userId = req.user.sub;
    const absence = await this.updateAbsenceUseCase.execute(
      id,
      updateAbsenceDto,
      userId,
    );
    return AbsenceMapper.toResponse(absence);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteAbsenceUseCase.execute(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const absence = await this.getAbsenceByIdUseCase.execute(id);
    return AbsenceMapper.toResponse(absence);
  }

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string) {
    const absences =
      await this.getAbsencesByEmployeeUseCase.execute(employeeId);
    return absences.map(AbsenceMapper.toResponse);
  }

  @Get()
  async findAll(@Query('status') status?: string) {
    if (status) {
      const absences = await this.getAbsencesByStatusUseCase.execute(status);
      return absences.map(AbsenceMapper.toResponse);
    }

    const absences = await this.getAllAbsencesUseCase.execute();
    return absences.map(AbsenceMapper.toResponse);
  }
}
