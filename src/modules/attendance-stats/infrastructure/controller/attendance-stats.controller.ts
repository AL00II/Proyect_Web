import { Controller, Get, Query } from "@nestjs/common";
import { GetEmployeeStatsUseCase } from "../../application/use-cases/get-employee-stats.usecase";
import { GetCompanyStatsUseCase } from "../../application/use-cases/get-company-stats.usecase";
import { AttendanceStatsInput } from "../../domain/types/attendance-stats.input";
import { GetAdvancedStatsUseCase } from "../../application/use-cases/get-advanced-stats.usecase";

@Controller("attendance-stats")
export class AttendanceStatsController {
  constructor(
    private readonly getEmployeeStatsUseCase: GetEmployeeStatsUseCase,
    private readonly getCompanyStatsUseCase: GetCompanyStatsUseCase,
    private readonly getAdvancedStatsUseCase: GetAdvancedStatsUseCase

  ) {}

  @Get("employee")
  getEmployeeStats(
    @Query("employeeId") employeeId: string,
    @Query("startDate") start: string,
    @Query("endDate") end: string
  ) {
    return this.getEmployeeStatsUseCase.execute({
      employeeId,
      startDate: new Date(start),
      endDate: new Date(end),
    });
  }

  @Get("company")
  getCompanyStats(
    @Query("startDate") start: string,
    @Query("endDate") end: string
  ) {
    return this.getCompanyStatsUseCase.execute({
      startDate: new Date(start),
      endDate: new Date(end),
    });
  }

  @Get("advanced-stats")
  async getAdvancedStats(@Query() input: AttendanceStatsInput) {

    const start = new Date(input.startDate);
    const end = new Date(input.endDate);

    return this.getAdvancedStatsUseCase.execute({
      ...input,
      startDate: start,
      endDate: end
    });
  }


}
