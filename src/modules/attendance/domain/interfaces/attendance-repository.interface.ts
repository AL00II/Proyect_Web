import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceInput } from '../types/create-attendance.input';
import { UpdateAttendanceInput } from '../types/update-attendance.input';


export abstract class IAttendanceRepository {
  abstract findTodayByEmployee(employeeId: string, date: Date): Promise<Attendance | null>;
  abstract create(data: CreateAttendanceInput): Promise<Attendance>;
  abstract update(id: string, data: UpdateAttendanceInput): Promise<Attendance>;
  abstract getEmployeesWithSchedule(todayWeekDay: number): Promise<any[]>; 
}