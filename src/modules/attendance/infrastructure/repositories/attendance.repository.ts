import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { IAttendanceRepository } from '../../domain/interfaces/attendance-repository.interface';
import { Attendance } from '../../domain/entities/attendance.entity';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { CreateAttendanceInput } from '../../domain/types/create-attendance.input';
import { UpdateAttendanceInput } from '../../domain/types/update-attendance.input';
import { EmployeeScheduleMapper } from '../mappers/employee-schedule.mapper';

@Injectable()
export class PrismaAttendanceRepository implements IAttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTodayByEmployee(employeeId: string, date: Date): Promise<Attendance | null> {
    const record = await this.prisma.attendance.findFirst({
      where: { employee_id: employeeId, date },
    });

    return record ? AttendanceMapper.toEntity(record) : null;
  }

  async create(data: CreateAttendanceInput): Promise<Attendance> {
    const created = await this.prisma.attendance.create({ data });
    return AttendanceMapper.toEntity(created);
  }

  async update(id: string, data: UpdateAttendanceInput): Promise<Attendance> {
    const updated = await this.prisma.attendance.update({ where: { id }, data });
    return AttendanceMapper.toEntity(updated);
  }

  async getEmployeesWithSchedule(weekDay: number): Promise<any[]> {
    const employees = await this.prisma.employee.findMany({
      where: {
        schedule_set: {
          details: {
            some: { week_day: weekDay }
          }
        }
      },
      include: {
        schedule_set: {
          include: {
            details: true
          }
        }
      }
    });

    return employees.map(emp => {
      const detail = emp.schedule_set!.details.find(d => d.week_day === weekDay);
      return EmployeeScheduleMapper.toTodayResult(emp, detail);
    });
  }

}
