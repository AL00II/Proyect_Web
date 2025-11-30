import { Injectable } from "@nestjs/common";
import { IAttendanceStatsRepository } from "../../domain/interfaces/attendance-stats-repository.interface";
import { AttendanceStatsInput } from "../../domain/types/attendance-stats.input";
import { AttendanceStat } from "../../domain/entities/attendance-stat.entity";

@Injectable()
export class GetEmployeeStatsUseCase {
  constructor(private readonly repo: IAttendanceStatsRepository) {}

  async execute(input: AttendanceStatsInput): Promise<AttendanceStat[]> {
    if (!input.employeeId) {
      throw new Error("EmployeeId is required");
    }
    return this.repo.getEmployeeStats(input);
  }
}
