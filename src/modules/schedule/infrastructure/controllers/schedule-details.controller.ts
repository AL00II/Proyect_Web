import {Body,Controller,Delete,Get,HttpCode,HttpStatus,Param,Post,Put,Req,UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CreateScheduleDetailUseCase } from '../../application/use-cases/create-schedule-detail.use-case';
import { GetScheduleDetailsBySetUseCase } from '../../application/use-cases/get-schedule-details-by-set.use-case';
import { UpdateScheduleDetailUseCase } from '../../application/use-cases/update-schedule-detail.use-case';
import { CreateScheduleDetailDto } from '../../application/dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from '../../application/dto/update-schedule-detail.dto';
import { ScheduleDetail } from '../../domain/entities/schedule-detail.entity';

@UseGuards(JwtAuthGuard)
@Controller('schedule-sets/:scheduleSetId/details')
export class ScheduleDetailsController {
  constructor(
    private readonly createScheduleDetailUseCase: CreateScheduleDetailUseCase,
    private readonly getScheduleDetailsBySetUseCase: GetScheduleDetailsBySetUseCase,
    private readonly updateScheduleDetailUseCase: UpdateScheduleDetailUseCase,
  ) {}

  @Post()
@HttpCode(HttpStatus.CREATED)
async createDetail(
  @Param('scheduleSetId') scheduleSetId: string,
  @Body() dto: CreateScheduleDetailDto,
  @Req() req: Request & { user: { id: string } },
): Promise<ScheduleDetail> {
  return await this.createScheduleDetailUseCase.execute({
    ...dto,
    schedules_set_id: scheduleSetId,
    created_by: req.user.id,
  });
}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByScheduleSet(
    @Param('scheduleSetId') scheduleSetId: string,
  ): Promise<ScheduleDetail[]> {
    return this.getScheduleDetailsBySetUseCase.execute(scheduleSetId);
  }

  @Put(':id')
@HttpCode(HttpStatus.OK)
async update(
  @Param('id') id: string,
  @Body() dto: UpdateScheduleDetailDto,
  @Req() req: Request & { user: { id: string } },
): Promise<ScheduleDetail | null> {
  return await this.updateScheduleDetailUseCase.execute(id, {
    ...dto,
    updated_by: req.user.id,
  });
}

}
