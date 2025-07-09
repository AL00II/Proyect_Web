import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateScheduleSetDto } from '../dto/create-schedule-set.dto';
import { CreateScheduleSetUseCase } from '../application/create-schedule-set.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserPayload } from '../../auth/interfaces/user-payload.interface';

@Controller('schedule-sets')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(
    private readonly createScheduleSetUseCase: CreateScheduleSetUseCase,
  ) {}

  @Post()
  async create(
    @Body() data: CreateScheduleSetDto,
    @GetUser() user: UserPayload,
  ) {
    return this.createScheduleSetUseCase.execute(data, user.id);
  }
}
