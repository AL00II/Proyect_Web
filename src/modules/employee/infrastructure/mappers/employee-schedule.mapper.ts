import { Employee as PrismaEmployee, ScheduleSet as PrismaScheduleSet, ScheduleDetail as PrismaScheduleDetail } from '../../../../../generated/prisma';
import { EmployeeWithSchedule } from '../../domain/entities/employee-shedule.entity';
import { EmployeeMapper } from './employee.mapper';
export { EmployeeMapper }; 

// Tipado explícito de lo que devuelve Prisma al incluir schedule_set + details
type EmployeeWithScheduleRaw = PrismaEmployee & {
  schedule_set: (PrismaScheduleSet & { details: PrismaScheduleDetail[] }) | null;
};


export class EmployeeWithScheduleMapper {
  static toEntity(prisma: EmployeeWithScheduleRaw): EmployeeWithSchedule {
    // Primero mapeamos la parte base (Employee)
    const baseEmployee = EmployeeMapper.toEntity(prisma);

    // Mapear schedule_set y sus details
    const scheduleSet = prisma.schedule_set
      ? {
          id: prisma.schedule_set.id,
          name: prisma.schedule_set.name,
          details: prisma.schedule_set.details.map(d => ({
            id: d.id,
            week_day: d.week_day,
            check_in: d.check_in,
            check_out: d.check_out,
            lunch_start: d.lunch_start,
            lunch_end: d.lunch_end,
          })),
        }
      : undefined;

    // Retornar la entidad extendida con schedule_set
    return new EmployeeWithSchedule(baseEmployee, scheduleSet);
  }
}
