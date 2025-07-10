import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateScheduleSetDto } from '../../application/dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetDto } from '../../application/dto/update-schedule-set.dto';
import { UpdateScheduleSetUseCase } from '../../application/use-cases/update-schedule-set-usecase';
import { CreateScheduleDetailUseCase } from '../../application/use-cases/create-schedule-detail.use-case';
import { CreateScheduleDetailDto } from '../../application/dto/create-schedule-detail.dto';

@Controller('schedule-sets')
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
    private readonly updateScheduleSetUseCase: UpdateScheduleSetUseCase,
    private readonly createScheduleDetailUseCase: CreateScheduleDetailUseCase
  ) {}

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


  @Post('details') 
  async createDetail(
    @Body() dto: CreateScheduleDetailDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.createScheduleDetailUseCase.execute({
      ...dto,
      created_by: req.user.sub,
    });
  }




}
