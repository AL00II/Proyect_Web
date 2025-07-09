import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateScheduleSetDto } from '../../application/dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { GetUser } from 'src/modules/auth/infrastructure/decorators/get-user.decorator';
import { JwtPayload } from '../../../users/domain/types/jwt-payload.type';

@Controller('schedule-sets')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
  ) {}

  @Post()
  async create(
    @Body() data: CreateScheduleSetDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.createScheduleSetUseCase.execute(data, user.sub);
  }
}
