import { Injectable } from "@nestjs/common";
import { IAttendanceStatsRepository } from "../../domain/interfaces/attendance-stats-repository.interface";
import { AttendanceStatsInput } from "../../domain/types/attendance-stats.input";
import { AttendanceStat } from "../../domain/entities/attendance-stat.entity";


@Injectable()
export class GetAdvancedStatsUseCase {
  constructor(private readonly repo: IAttendanceStatsRepository) {}

  async execute(input: AttendanceStatsInput) {
    // 1️⃣ Obtener estadísticas del repositorio (ya vienen mapeadas por días)
    const stats: AttendanceStat[] = await this.repo.getCompanyStats(input);

    // 2️⃣ Aplicar análisis avanzado
    return {
      punctual: this.getMostPunctual(stats),
      early: this.getEarlyBirds(stats),
      late: this.getMostLate(stats),
      absent: this.getMostAbsent(stats),
    };
  }


  //  MÉTRICAS

  private getMostPunctual(stats: AttendanceStat[], minCount = 3) {
    return this.groupAndSort(stats, "checkInOnTime", minCount);
  }

  private getEarlyBirds(stats: AttendanceStat[], minCount = 2) {
    return this.groupAndSort(stats, "checkInEarly", minCount);
  }

  private getMostLate(stats: AttendanceStat[], minCount = 2) {
    return this.groupAndSort(stats, "checkInLate", minCount);
  }

  private getMostAbsent(stats: AttendanceStat[], minCount = 1) {
    return this.groupAndSort(stats, "checkInAbsent", minCount);
  }

  //  FUNCIÓN GENÉRICA PARA REUSAR

  private groupAndSort(
    stats: AttendanceStat[],
    field: keyof AttendanceStat,
    minCount: number,
  ) {
    const map = new Map<string, number>();

    stats.forEach(s => {
      const value = (s[field] as number) ?? 0;
      map.set(s.employeeId, (map.get(s.employeeId) || 0) + value);
    });

    return [...map.entries()]
      .filter(([_, total]) => total >= minCount)
      .sort((a, b) => b[1] - a[1])
      .map(([employeeId, total]) => {
        const first = stats.find(s => s.employeeId === employeeId);

        return {
          employeeId,
          total,
          employeeName: first?.employeeName ?? "",
          employeePhoto: first?.employeePhoto ?? null,
        };
      });

  }
}
