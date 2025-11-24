import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/infrastructure/guards/jwt-auth.guard';
import { RuleModule } from './modules/rules/rule.module';
import { PrismaModule } from './core/database/prisma.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthService } from './modules/auth/auth.service';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { DeviceModule } from './modules/device/decive.module';
import { AbsenceModule } from './modules/absence/absence.module';


@Module({
  imports: [AuthModule, UsersModule, ScheduleModule, RuleModule, EmployeeModule, AttendanceModule, DeviceModule,  AbsenceModule,],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
  ],
})
export class AppModule {}
