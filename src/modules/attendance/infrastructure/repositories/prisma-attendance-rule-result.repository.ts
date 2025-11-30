import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../core/database/prisma.service";
import { IAttendanceRuleResultRepository } from "../../domain/interfaces/attendance-rule-result-repository.interface";
import { AttendanceRuleResultMapper } from "../mappers/attendance-rule-result.mapper";

@Injectable()
export class PrismaAttendanceRuleResultRepository implements IAttendanceRuleResultRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByAttendanceId(attendanceId: string) {
    const found = await this.prisma.attendanceRuleResult.findUnique({
      where: { attendanceId }, 
    });

    return found ? AttendanceRuleResultMapper.toDomain(found) : null;
  }

  async createOrUpdate(data: {
    attendanceId: string;
    employeeId: string;

    ruleInId?: string | null;
    statusIn?: string | null;
    minutesLateIn?: number | null;

    ruleLunchId?: string | null;
    statusLunch?: string | null;
    minutesLateLunch?: number | null;
  }) {
    const existing = await this.findByAttendanceId(data.attendanceId);

    if (!existing) {
      const created = await this.prisma.attendanceRuleResult.create({
        data: {
          attendanceId: data.attendanceId,
          employee_id: data.employeeId,
          rule_in_id: data.ruleInId,
          status_in: data.statusIn,
          minutes_late_in: data.minutesLateIn,
          rule_lunch_id: data.ruleLunchId,
          status_lunch: data.statusLunch,
          minutes_late_lunch: data.minutesLateLunch,
        },
      });

      return AttendanceRuleResultMapper.toDomain(created);
    }

    const updated = await this.prisma.attendanceRuleResult.update({
      where: { attendanceId: data.attendanceId },
      data: {
        rule_in_id: data.ruleInId ?? existing.ruleInId,
        status_in: data.statusIn ?? existing.statusIn,
        minutes_late_in: data.minutesLateIn ?? existing.minutesLateIn,

        rule_lunch_id: data.ruleLunchId ?? existing.ruleLunchId,
        status_lunch: data.statusLunch ?? existing.statusLunch,
        minutes_late_lunch: data.minutesLateLunch ?? existing.minutesLateLunch,
      },
    });

    return AttendanceRuleResultMapper.toDomain(updated);
  }
}
