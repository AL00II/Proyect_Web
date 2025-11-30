import { Injectable } from '@nestjs/common';
import { IAttendanceRepository } from '../../domain/interfaces/attendance-repository.interface';
import { AttendanceTodayResult } from '../../domain/types/attendance-today-result';

@Injectable()
export class GetEmployeesTodayUseCase {
  constructor(private readonly attendanceRepo: IAttendanceRepository) {}

  async execute(): Promise<AttendanceTodayResult[]> {
    const today = new Date();
    const weekDay = today.getDay() === 0 ? 7 : today.getDay();

    // Solo la fecha sin hora
    const onlyDate = new Date(today.toISOString().split("T")[0]);

    // Empleados con horario hoy
    const employees = await this.attendanceRepo.getEmployeesWithSchedule(weekDay);

    const response: AttendanceTodayResult[] = [];

    for (const emp of employees) {
      // Ver si ya tiene asistencia registrada hoy
      const attendanceRecord = await this.attendanceRepo.findTodayByEmployee(emp.id, onlyDate);

     response.push({
      employee_id: emp.id,
      name: `${emp.name} ${emp.last_name}`,
      facial_vector: emp.facial_vector,
      photo: emp.photo,
      schedule_detail: emp.scheduleDetail,  // ← corregido
      attendance: attendanceRecord ?? {
        check_in: null,
        lunch_start: null,
        lunch_end: null,
        check_out: null,
      },
   });

    }

    return response;
  }
}
