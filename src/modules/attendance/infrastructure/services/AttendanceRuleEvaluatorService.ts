import { Injectable } from "@nestjs/common";
import { Attendance } from "../../domain/entities/attendance.entity";
import { Rule } from "../../../rules/domain/entities/rule.entity";

@Injectable()
export class AttendanceRuleEvaluatorService {

  evaluate(
    attendance: Attendance,
    rules: Rule[]
  ): {
    rule_id: string;
    status: string;
    minutes_late?: number | null;
  }[] {
    const results: any[] = [];

    for (const rule of rules) {
      if (rule.type === "retardo") {
        const res = this.checkRetardoRule(attendance, rule);
        if (res) results.push({ ...res, rule_id: rule.id });
      }

      if (rule.type === "puntual") {
        const res = this.checkPuntualRule(attendance, rule);
        if (res) results.push({ ...res, rule_id: rule.id });
      }
    }

    return results;
  }

  private checkRetardoRule(att: Attendance, rule: Rule) {
    if (!att.check_in) return null;

    const scheduleTime = new Date(att.scheduleDetail.start_time);
    const arrival = new Date(att.check_in);

    const diffMin = Math.floor((arrival.getTime() - scheduleTime.getTime()) / 60000);

    if (diffMin > rule.value!) { 
      return {
        status: "late",
        minutes_late: diffMin
      };
    }

    return null;
  }

  private checkPuntualRule(att: Attendance, rule: Rule) {
    if (!att.check_in) return null;

    const scheduleTime = new Date(att.scheduleDetail.start_time);
    const arrival = new Date(att.check_in);

    if (arrival <= scheduleTime) {
      return {
        status: "on_time",
        minutes_late: 0
      };
    }

    return null;
  }
}
