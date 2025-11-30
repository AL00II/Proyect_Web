import { Injectable } from "@nestjs/common";
import { Rule } from "src/modules/rules/domain/entities/rule.entity";
import { IRuleRepository } from "src/modules/rules/domain/interfaces/rule.repository.interface";
import { Attendance } from "../../domain/entities/attendance.entity";
import { AttendanceRuleEvaluatorService } from "../../infrastructure/services/AttendanceRuleEvaluatorService";
import { IAttendanceRuleResultRepository } from "../../domain/interfaces/attendance-rule-result-repository.interface";


@Injectable()
export class ApplyAttendanceRulesUseCase {
  constructor(
    private readonly ruleRepo: IRuleRepository,
    private readonly resultRepo: IAttendanceRuleResultRepository,
  ) {}

  async execute(attendance: Attendance, employeeId: string) {

    const rules = await this.ruleRepo.getApplicableRulesForEmployee(employeeId);

    const toleranceEntry = rules.find(r => r.type === "tolerance_entry");
    const toleranceLunch = rules.find(r => r.type === "tolerance_lunch");

    type InStatus = "early" | "on_time" | "late" | "absent" | null;
    type LunchStatus = "early" | "on_time" | "late" | "not_returned" | null;

    let statusIn: InStatus = null;
    let minutesLateIn: number | null = null;

    let statusLunch: LunchStatus = null;
    let minutesLateLunch: number | null = null;

//Entrada 

    if (!attendance.check_in) {
      statusIn = "absent";
    } else {
      
      const diff = attendance.check_in.getTime() - attendance.scheduleDetail.check_in.getTime();
      const minutes = Math.ceil(diff / 60000);

      if (minutes < 0) statusIn = "early";
      else if (minutes <= (toleranceEntry?.value ?? 0)) statusIn = "on_time";
      else {
        statusIn = "late";
        minutesLateIn = minutes;
      }
    }

//Regreso del lonche
    if (attendance.lunch_start && !attendance.lunch_end) {
      statusLunch = "not_returned";
    } else if (attendance.lunch_end) {
      const diff = attendance.lunch_end.getTime() - attendance.scheduleDetail.lunch_end.getTime();
      const minutes = Math.ceil(diff / 60000);

      if (minutes < 0) statusLunch = "early";
      else if (minutes <= (toleranceLunch?.value ?? 0)) statusLunch = "on_time";
      else {
        statusLunch = "late";
        minutesLateLunch = minutes;
      }
    }

    return this.resultRepo.createOrUpdate({
      attendanceId: attendance.id,
      employeeId,

      ruleInId: toleranceEntry?.id ?? null,
      statusIn,
      minutesLateIn,

      ruleLunchId: toleranceLunch?.id ?? null,
      statusLunch,
      minutesLateLunch,
    });
  }
}
