import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../..//core/database/prisma.service';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { ScheduleSet } from '../../domain/entities/schedule-set.entity';
import { ScheduleSetOutput } from '../../domain/types/scheduleSet-output.type';
import { EmployeeMapper } from 'src/modules/employee/infrastructure/mappers/employee-schedule.mapper';
import { Employee } from 'generated/prisma';

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ScheduleSetOutput[]> {
    return this.prisma.scheduleSet.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async findById(id: string): Promise<ScheduleSetOutput | null> {
    return this.prisma.scheduleSet.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async createScheduleSet(data: {
    name: string;
    description?: string;
    is_active?: boolean;
    created_by: string;
  }): Promise<ScheduleSet> {
    return this.prisma.scheduleSet.create({
      data: {
        name: data.name,
        description: data.description,
        is_active: data.is_active ?? true,
        created_by: data.created_by,
      },
    });
  }

  async updateScheduleSet(
    id: string,
    data: {
      name?: string;
      description?: string;
      is_active?: boolean;
      updated_by: string;
    },
  ): Promise<ScheduleSet> {
    return this.prisma.scheduleSet.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        updated_by: data.updated_by,
        updated_at: new Date(),
      },
    });
  }
  async hasDetails(id: string): Promise<boolean> {
    const count = await this.prisma.scheduleDetail.count({
      where: { schedules_set_id: id },
    });
    return count > 0;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.scheduleSet.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

  async findEmployees(scheduleSetId: string): Promise<Employee[]> {
      const employees = await this.prisma.employee.findMany({
        where: { schedule_set_id: scheduleSetId }
      });
     return employees.map(emp => 
        EmployeeMapper.toEntity(emp)
      ) as Employee[];
    }

}
