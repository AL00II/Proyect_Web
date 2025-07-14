import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateScheduleSetDto } from '../../application/dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetDto } from '../../application/dto/update-schedule-set.dto';
import { UpdateScheduleSetUseCase } from '../../application/use-cases/update-schedule-set-usecase';
import { ScheduleSetOutput } from '../../domain/types/scheduleSet-output.type';
import { GetAllScheduleSetsUseCase } from '../../application/use-cases/get-all-ScheduleSet.usecase';
import { GetByIScheduleSetdUseCase } from '../../application/use-cases/getby-Id-schedule-set.usecase';
import { DeleteScheduleSetUseCase } from '../../application/use-cases/delete-schedule-set.usecase';

@Controller('schedule-sets')
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
    private readonly updateScheduleSetUseCase: UpdateScheduleSetUseCase,
    private readonly getAllScheduleSetsUseCase: GetAllScheduleSetsUseCase,
    private readonly getScheduleSetByIdUseCase: GetByIScheduleSetdUseCase,
    private readonly deleteScheduleSetUseCase: DeleteScheduleSetUseCase,
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
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.deleteScheduleSetUseCase.execute(id);
    if (!result.success) {
      throw new ConflictException(result.message);
    }
    return result;
  }
}
