export class AttendanceRuleResult {
  constructor(
    public id: string,
    public employeeId: string,
    public attendanceId: string,

    public ruleInId: string | null,
    public ruleLunchId: string | null,
    
    public statusIn: "early" | "on_time" | "late" | "absent" | null,
    public minutesLateIn: number | null,

    public statusLunch: "early" | "on_time" | "late" | "not_returned" | null,
    public minutesLateLunch: number | null,


    public createdAt: Date,
  
    public employeeName?: string | null,
    public employeePhoto?: string | null
  ) {}
}
