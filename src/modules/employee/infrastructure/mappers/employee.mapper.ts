import { Employee } from '../../domain/entities/employee.entity';
import { Employee as PrismaEmployee } from '../../../../../generated/prisma';

export class EmployeeMapper {
  static toEntity(prisma: PrismaEmployee): Employee {
    let facialVector: number[] | null = null;
    if (Array.isArray(prisma.facial_vector)) {
  
      facialVector = prisma.facial_vector as number[];
    } else if (typeof prisma.facial_vector === 'string') {
      try {
        facialVector = JSON.parse(prisma.facial_vector);
      } catch {
        facialVector = null;
      }
    }

    return new Employee(
      prisma.id,
      prisma.name,
      prisma.last_name,
      prisma.matricula,
      prisma.phone,
      prisma.facial_vector,
      prisma.URL_photo,
      prisma.active,
      prisma.created_by_id,
      prisma.updated_by_id ?? null,
      prisma.schedule_set_id ?? null,
      prisma.createdAt,
      prisma.updatedAt ?? null,
    );
  }

  static toPersistence(employee: Employee) {
    return {
      name: employee.name,
      last_name: employee.last_name,
      matricula: employee.matricula,
      phone: employee.phone,
      facial_vector: employee.facial_vector,  
      URL_photo: employee.URL_photo,
      active: employee.active,
      created_by_id: employee.created_by_id,
      updated_by_id: employee.updated_by_id ?? null,
      schedule_set_id: employee.schedule_set_id ?? null,
    };
  }
}
