import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateScheduleSetDto } from '../../application/dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetDto } from '../../application/dto/update-schedule-set.dto';
import { UpdateScheduleSetUseCase } from '../../application/use-cases/update-schedule-set-usecase';
import { ScheduleSetOutput } from '../../domain/types/scheduleSet-output.type';
import { GetAllScheduleSetsUseCase } from '../../application/use-cases/get-all-ScheduleSet.usecase';
import { GetByIScheduleSetdUseCase } from '../../application/use-cases/getby-Id-schedule-set.usecase';

@Controller('schedule-sets')
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
    private readonly updateScheduleSetUseCase: UpdateScheduleSetUseCase,
    private readonly getAllScheduleSetsUseCase: GetAllScheduleSetsUseCase,
    private readonly getScheduleSetByIdUseCase: GetByIScheduleSetdUseCase,
  ) {}

  @Get()
  async findAll(): Promise<ScheduleSetOutput[]> {
    return this.getAllScheduleSetsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ScheduleSetOutput | null> {
    return this.getScheduleSetByIdUseCase.execute(id);
  }
  @Post()
  async create(
    @Body() data: CreateScheduleSetDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.createScheduleSetUseCase.execute(data, req.user.sub);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateScheduleSetDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.updateScheduleSetUseCase.execute(id, data, req.user.sub);
  }
}
