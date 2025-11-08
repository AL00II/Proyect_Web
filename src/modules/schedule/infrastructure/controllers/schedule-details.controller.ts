import {Body,Controller, Delete,Get,HttpCode,HttpStatus,Param,Post,Patch,Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateScheduleDetailUseCase } from '../../application/use-cases/create-schedule-detail.usecase';
import { UpdateScheduleDetailUseCase } from '../../application/use-cases/update-schedule-detail.usecase';
import { DeleteScheduleDetailUseCase } from '../../application/use-cases/delete-schedule-detail.usecase';
import { CreateScheduleDetailDto } from '../../application/dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from '../../application/dto/update-schedule-detail.dto';
import { ScheduleDetailOutput } from '../../domain/types/scheduleDetail-output.type';
import { GetScheduleDetailsBySetIdUseCase } from '../../application/use-cases/get-schedule-details-by-set.usecase';

@Controller('schedule-sets/:scheduleSetId/details')
export class ScheduleDetailsController {
  constructor(
    private readonly createDetailUseCase: CreateScheduleDetailUseCase,
    private readonly updateDetailUseCase: UpdateScheduleDetailUseCase,
    private readonly deleteDetailUseCase: DeleteScheduleDetailUseCase,
    private readonly getDetailsByScheduleSetUseCase: GetScheduleDetailsBySetIdUseCase,
  ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(
    @Param('scheduleSetId') scheduleSetId: string,
    ): Promise<ScheduleDetailOutput[]> {
    return this.getDetailsByScheduleSetUseCase.execute(scheduleSetId);
    }

    @Post()
    async create(
      @Param('scheduleSetId') scheduleSetId: string,
      @Body() dto: CreateScheduleDetailDto,
      @Req() req: Request & { user: { sub: string } },
    ) {
      return this.createDetailUseCase.execute({
        ...dto,
        schedules_set_id: scheduleSetId,
        created_by: req.user.sub,
      });
    }
            
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() dto: UpdateScheduleDetailDto,
      @Req() req: Request & { user: { sub: string } },
    ) {
      const input = { ...dto, updated_by: req.user.sub };
      return this.updateDetailUseCase.execute(id, input);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
      const del = await this.deleteDetailUseCase.execute(id);
        return { message: `${del}`};
    }
}
