import { Employee } from '../../domain/entities/employee.entity';
import { Employee as PrismaEmployee } from '../../../../../generated/prisma';

export class EmployeeMapper {
  static toEntity(prisma: PrismaEmployee): Employee {
    return new Employee(
      prisma.name,
      prisma.last_name,
      prisma.matricula,
      prisma.ideal_vector,
      prisma.full_proto,
      prisma.active,
      prisma.created_by_id,
      prisma.id,

    );
  }

  static toPersistence(employee: Employee) {
    return {
      id: employee.id ?? '',
      name: employee.name,
      last_name: employee.last_name,
      matricula: employee.matricula,
      facial_vector: employee.facial_vector,
      URL_photo: employee.URL_photo,
      active: employee.active,
      created_by_id: employee.created_by_id,
      updated_by_id: employee.updated_by_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
