import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateScheduleSetDto } from '../../application/dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';

@Controller('schedule-sets')
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
  ) {}

  @Post()
  async create(
    @Body() data: CreateScheduleSetDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.createScheduleSetUseCase.execute(data, req.user.sub);
  }
}
