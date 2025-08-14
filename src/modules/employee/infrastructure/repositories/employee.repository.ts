import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../src/core/database/prisma.service';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { Employee } from '../../domain/entities/employee.entity';
import { EmployeeMapper } from '../mappers/employee.mapper';


@Injectable()
export class PrismaEmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

    async create(employee: Employee): Promise<Employee> {
      const data = EmployeeMapper.toPersistence(employee);

      if (!data.created_by_id) {
        throw new Error('El campo created_by_id es requerido');
      }

      const created = await this.prisma.employee.create({
        data,
      });

      return EmployeeMapper.toEntity(created);
    }


    async findByMatricula(matricula: string): Promise<Employee | null> {
      const record = await this.prisma.employee.findUnique({ where: {matricula } });
      return record ? EmployeeMapper.toEntity(record) : null;
    }
    
    async   findAllEmployees(): Promise<Employee[]> {
    const records = await this.prisma.employee.findMany();
    return records.map(EmployeeMapper.toEntity);
    }
  
}
