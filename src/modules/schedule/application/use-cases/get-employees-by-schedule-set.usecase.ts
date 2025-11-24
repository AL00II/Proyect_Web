import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { Employee } from '../../../employee/domain/entities/employee.entity';

@Injectable()
export class GetEmployeesByScheduleSetUseCase {
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

    async execute(scheduleSetId: string): Promise<Employee[]> {
    const employees = await this.scheduleRepository.findEmployees(scheduleSetId);

    return employees.map(emp =>
        new Employee(
        emp.id!,
        emp.name,
        emp.last_name,
        emp.matricula,
        emp.phone,
        Array.isArray(emp.facial_vector) ? emp.facial_vector as number[] : null,
        emp.URL_photo,
        emp.active,
        emp.created_by_id,
        emp.updated_by_id,
        emp.schedule_set_id,
        emp.createdAt!,
        emp.updatedAt,
        )
    );
    }
}
