import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { Employee } from '../../domain/entities/employee.entity';
import { EmployeeWithScheduleMapper } from '../mappers/employee-schedule.mapper';
import { EmployeeUpdateInput } from '../../domain/types/employee-update-input';
import { CreateEmployeeInput } from '../../domain/types/create-employee-input';
import { Prisma } from '../../../../../generated/prisma';
import { EmployeeMapper } from '../mappers/employee.mapper';



@Injectable()
export class PrismaEmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateEmployeeInput, created_by_id: string): Promise<Employee> {
      const created = await this.prisma.employee.create({
        data: {
          ...data,
          created_by_id,
          updated_by_id: null,
          facial_vector: data.facial_vector ?? Prisma.JsonNull,
    
        },
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

    async findByPhone(phone: string): Promise<Employee | null> {
      const prismaEmployee = await this.prisma.employee.findFirst({
        where: { phone },
      });

      return prismaEmployee ? EmployeeMapper.toEntity(prismaEmployee) : null;
    }

    async update(id: string, data: EmployeeUpdateInput): Promise<Employee> {
      const updated = await this.prisma.employee.update({
        where: { id },
        data: {
          ...data,
          updated_by_id: data.updated_by_id ?? null,
          facial_vector: data.facial_vector ?? Prisma.JsonNull,
        },
      });

      return EmployeeMapper.toEntity(updated);
    }



    async delete(id: string): Promise<string> {
      try {
        await this.prisma.employee.delete({ where: { id } });
        return  ''
      } catch (err)  {
        return (err.message)
      }
    }

  async assignSchedule(employeeId: string, scheduleSetId: string, updatedBy: string): Promise<boolean> {
      await this.prisma.employee.update({
        where: { id: employeeId },
        data: { schedule_set_id: scheduleSetId, updated_by_id: updatedBy},
      });
      return true;
  }


  async updateFaceData(id: string, data: { facial_vector: number[]; URL_photo: string }) {
    const vectorAsString = data.facial_vector;
    const updated = await this.prisma.employee.update({
      where: { id },
      data: {
        facial_vector: vectorAsString,
        URL_photo: data.URL_photo
      }
    });
    return EmployeeMapper.toEntity(updated);

  }
  async findEmployeeById(id: string): Promise<Employee & { schedule_set?: any } | null> {
    const record = await this.prisma.employee.findUnique({
      where: { id },
      include: { schedule_set: { include: { details: true } } },
    });

    return record ? EmployeeWithScheduleMapper.toEntity(record) : null;
  }

}