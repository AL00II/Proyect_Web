export class AttendanceStat {
  constructor(
    public employeeId: string,
    public date: Date,
    public weekDay: Date,

    // Estados de check-in
    public checkInOnTime: number,
    public checkInLate: number,
    public checkInEarly: number,
    public checkInAbsent: number,

    // Estados de lunch
    public lunchOnTime: number,
    public lunchLate: number,
    public lunchEarly: number,
    public lunchNotReturned: number,

    // Datos opcionales del empleado (para mostrar foto/nombre en frontend)
    public employeeName?: string | null,
    public employeePhoto?: string | null
  ) {}
}
