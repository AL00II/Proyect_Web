import { Injectable } from '@nestjs/common';
import { IAttendanceRepository } from '../../domain/interfaces/attendance-repository.interface';
import { IEmployeeRepository } from 'src/modules/employee/domain/interfaces/employee-repository.interface';
import { UpdateAttendanceInput } from '../../domain/types/update-attendance.input';
import { EmployeeWithSchedule } from 'src/modules/employee/domain/entities/employee-shedule.entity';
import { ApplyAttendanceRulesUseCase } from './evaluate-attendance-rules.usecase';

@Injectable()
export class RegisterAttendanceEventUseCase {
  constructor(
    private readonly attendanceRepo: IAttendanceRepository,
    private readonly employeeRepo: IEmployeeRepository,
    private readonly applyRules: ApplyAttendanceRulesUseCase,
  ) {}

  async execute(employeeId: string, timestamp: Date) {
    const employee = await this.employeeRepo.findEmployeeById(employeeId) as EmployeeWithSchedule;
    if (!employee) throw new Error('Empleado no encontrado');

    const weekDay = timestamp.getDay() === 0 ? 7 : timestamp.getDay();
    const dateOnly = new Date(timestamp);
    dateOnly.setHours(0, 0, 0, 0);

    let todayAttendance = await this.attendanceRepo.findTodayByEmployee(employeeId, dateOnly);

    let scheduleDetail: any = null;

    // --- SI NO EXISTE ASISTENCIA → CREARLA ---
    if (!todayAttendance) {
      const scheduleSet = employee.schedule_set;
      if (!scheduleSet) {
        throw new Error('Empleado sin set de horarios');
      }

      // Aquí estaba el error → schedule_set puede ser undefined
      scheduleDetail = scheduleSet.details.find(d => d.week_day === weekDay);
      if (!scheduleDetail) throw new Error('Empleado sin horario para hoy');

      todayAttendance = await this.attendanceRepo.create({
        employee_id: employeeId,
        schedule_detail_id: scheduleDetail.id,
        date: dateOnly,
        week_day: weekDay,
      });

    } else {
      // Asistencia ya existe → el scheduleDetail viene unido por Prisma
      scheduleDetail = todayAttendance.scheduleDetail;
    }

    const fieldToUpdate: Partial<UpdateAttendanceInput> = {};

    // --- ORDEN DE REGISTRO ---
    if (!todayAttendance.check_in) {
      fieldToUpdate.check_in = timestamp;
    }
    else if (scheduleDetail?.lunch_start && !todayAttendance.lunch_start) {
      fieldToUpdate.lunch_start = timestamp;
    }
    else if (scheduleDetail?.lunch_end && !todayAttendance.lunch_end) {
      fieldToUpdate.lunch_end = timestamp;
    }
    else if (!todayAttendance.check_out) {
      fieldToUpdate.check_out = timestamp;
    }
    else {
      throw new Error('El empleado ya registró todos los eventos del día');
    }

    const updated = await this.attendanceRepo.update(todayAttendance.id, fieldToUpdate);

    // Aplicar reglas de asistencia
    await this.applyRules.execute(updated, employeeId);

    return updated;
  }
}
