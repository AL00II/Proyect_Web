import { Injectable } from '@nestjs/common';
import { IAttendanceRepository } from '../../domain/interfaces/attendance-repository.interface';
import { IEmployeeRepository } from 'src/modules/employee/domain/interfaces/employee-repository.interface';
import { UpdateAttendanceInput } from '../../domain/types/update-attendance.input';
import { EmployeeWithSchedule } from 'src/modules/employee/domain/entities/employee-shedule.entity';

@Injectable()
export class RegisterAttendanceEventUseCase {
  constructor(
    private readonly attendanceRepo: IAttendanceRepository,
    private readonly employeeRepo: IEmployeeRepository,
  ) {}

  async execute(employeeId: string, timestamp: Date) {
    const employee = await this.employeeRepo.findEmployeeById(employeeId) as EmployeeWithSchedule;
    if (!employee) throw new Error('Empleado no encontrado');

    // Ajuste para que domingo sea 7
    const weekDay = timestamp.getDay() === 0 ? 7 : timestamp.getDay();

    // Fecha sin hora
    const dateOnly = new Date(timestamp);
    dateOnly.setHours(0, 0, 0, 0);

    // Buscar asistencia del día
    let todayAttendance = await this.attendanceRepo.findTodayByEmployee(employeeId, dateOnly);

    if (!todayAttendance) {
      // Encontrar ScheduleDetail del día
      const scheduleDetail = employee.schedule_set?.details.find(d => d.week_day === weekDay);
      if (!scheduleDetail) throw new Error('Empleado sin horario para hoy');

      todayAttendance = await this.attendanceRepo.create({
        employee_id: employeeId,
        schedule_detail_id: scheduleDetail.id,
        date: dateOnly,
        week_day: weekDay,
      });
    }

    const fieldToUpdate: Partial<UpdateAttendanceInput> = {};

    if (!todayAttendance.check_in) {
      fieldToUpdate.check_in = timestamp;
    } else if (!todayAttendance.lunch_start) {
      fieldToUpdate.lunch_start = timestamp;
    } else if (!todayAttendance.lunch_end) {
      fieldToUpdate.lunch_end = timestamp;
    } else if (!todayAttendance.check_out) {
      fieldToUpdate.check_out = timestamp;
    } else {
      throw new Error('El empleado ya registró todos los eventos del día');
    }

    return this.attendanceRepo.update(todayAttendance.id, fieldToUpdate);
  }
}
