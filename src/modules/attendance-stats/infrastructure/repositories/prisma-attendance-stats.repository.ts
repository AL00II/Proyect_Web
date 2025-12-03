import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../core/database/prisma.service";
import { IAttendanceStatsRepository } from "../../domain/interfaces/attendance-stats-repository.interface";
import { AttendanceStat } from "../../domain/entities/attendance-stat.entity";
import { AttendanceStatsInput } from "../../domain/types/attendance-stats.input";
import { AttendanceStatMapper } from "../mappers/attendance-stat.mapper";

@Injectable()
export class PrismaAttendanceStatsRepository implements IAttendanceStatsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getEmployeeStats(input: AttendanceStatsInput): Promise<AttendanceStat[]> {
  const { employeeId, startDate, endDate } = input;

  const results = await this.prisma.attendanceRuleResult.findMany({
    where: {
      employee_id: employeeId,
      attendance: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    include: { 
      attendance: true,
      employee: {
        select: {
          id: true,
          name: true,
          last_name: true,
          URL_photo: true, 
        }
     },
    }
  });

  // Mapear a AttendanceRuleResult
  const mapped = results.map(r => ({
    id: r.id,                    
    attendanceId: r.attendanceId,
    employeeId: r.employee_id,
    ruleInId: r.rule_in_id,
    employeeName: `${r.employee.name} ${r.employee.last_name}`,
    employeePhoto: r.employee.URL_photo,  
    ruleLunchId: r.rule_lunch_id,
    statusIn: ["early", "on_time", "late", "absent"].includes(r.status_in ?? "")
    ? (r.status_in as "early" | "on_time" | "late" | "absent")
    : null,
    statusLunch: ["early", "on_time", "late", "not_returned"].includes(r.status_lunch ?? "")
      ? (r.status_lunch as "early" | "on_time" | "late" | "not_returned")
      : null,
    minutesLateIn: r.minutes_late_in,
    minutesLateLunch: r.minutes_late_lunch,
    createdAt: r.attendance.date,
  }));

    return AttendanceStatMapper.toEmployeeStats(mapped);
  }

  async getCompanyStats(input: AttendanceStatsInput): Promise<AttendanceStat[]> {
    const existingEmployeeIds = await this.prisma.employee.findMany({
      select: { id: true },
    }).then(res => res.map(e => e.id));

    const results = await this.prisma.attendanceRuleResult.findMany({
      where: {
        attendance: {
          date: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        employee_id: { in: existingEmployeeIds }, // <-- filtramos los que existen
      },
      include: {
        attendance: true,
        employee: {
          select: {
            id: true,
            name: true,
            last_name: true,
            URL_photo: true,
          },
        },
      },
    });

    // Mappear datos
    const mapped = results.map(r => ({
      id: r.id,
      attendanceId: r.attendanceId,
      employeeId: r.employee_id,
      employeeName: `${r.employee.name} ${r.employee.last_name}`,
      employeePhoto: r.employee.URL_photo,
      ruleInId: r.rule_in_id,
      ruleLunchId: r.rule_lunch_id,
      statusIn: ["early", "on_time", "late", "absent"].includes(r.status_in ?? "")
        ? (r.status_in as "early" | "on_time" | "late" | "absent")
        : null,
      statusLunch: ["early", "on_time", "late", "not_returned"].includes(r.status_lunch ?? "")
        ? (r.status_lunch as "early" | "on_time" | "late" | "not_returned")
        : null,
      minutesLateIn: r.minutes_late_in,
      minutesLateLunch: r.minutes_late_lunch,
      createdAt: r.attendance.date,
    }));

    return AttendanceStatMapper.toEmployeeStats(mapped);
  }


    

}

