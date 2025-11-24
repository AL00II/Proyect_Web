import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GetEmployeesTodayUseCase } from '../../application/use-cases/get-today-attendance.usecase';
import { RegisterAttendanceEventUseCase } from '../../application/use-cases/register-attendance.usecase';
import { DeviceAuthGuard } from 'src/modules/auth/infrastructure/guards/device-auth.guard';
import { Device } from 'src/modules/auth/infrastructure/decorators/device.decorator';

@UseGuards(DeviceAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly getTodayAttendance: GetEmployeesTodayUseCase,
    private readonly registerAttendance: RegisterAttendanceEventUseCase,
  ) {}

  
  @Get('today')
  async getToday(@Device() device) {
    const list =  await this.getTodayAttendance.execute();
    return { msg: 'Acceso permitido', device, list};
  }

  @Post('event/:employeeId')
  async registerEvent(
    @Param('employeeId') employeeId: string,
    @Body('timestamp') timestamp: string, 
  ) {
    const ts = new Date(timestamp);
    if (isNaN(ts.getTime())) {
      throw new Error('Timestamp inválido');
    }

    const attendance = await this.registerAttendance.execute(employeeId, ts);
    return attendance;
  }
}
