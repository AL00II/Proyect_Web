import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';
import { Absence } from '../../domain/entities/absence.entity';
import { CreateAbsenceInput } from '../../domain/types/create-absence-input';
import { UpdateAbsenceInput } from '../../domain/types/update-absence-input';
import { AbsenceMapper } from '../mappers/absence.mapper';

@Injectable()
export class AbsenceRepository implements IAbsenceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAbsenceInput): Promise<Absence> {
    const prismaAbsence = await this.prisma.absence.create({
      data: AbsenceMapper.toPrismaCreate(data),
    });
    return AbsenceMapper.toDomain(prismaAbsence);
  }

  async update(id: string, data: UpdateAbsenceInput): Promise<Absence> {
    const prismaAbsence = await this.prisma.absence.update({
      where: { id },
      data: AbsenceMapper.toPrismaUpdate(data),
    });
    return AbsenceMapper.toDomain(prismaAbsence);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.absence.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Absence | null> {
    const prismaAbsence = await this.prisma.absence.findUnique({
      where: { id },
    });
    return prismaAbsence ? AbsenceMapper.toDomain(prismaAbsence) : null;
  }

  async findByEmployeeId(employeeId: string): Promise<Absence[]> {
    const prismaAbsences = await this.prisma.absence.findMany({
      where: { employee_id: employeeId },
      orderBy: { start_date: 'desc' },
    });
    return prismaAbsences.map(AbsenceMapper.toDomain);
  }

  async findByStatus(status: string): Promise<Absence[]> {
    const prismaAbsences = await this.prisma.absence.findMany({
      where: { status },
      orderBy: { created_at: 'desc' },
    });
    return prismaAbsences.map(AbsenceMapper.toDomain);
  }

  async findAll(): Promise<Absence[]> {
    const prismaAbsences = await this.prisma.absence.findMany({
      orderBy: { created_at: 'desc' },
    });
    return prismaAbsences.map(AbsenceMapper.toDomain);
  }

  async findByEmployeeAndDateRange(
    employeeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Absence[]> {
    const prismaAbsences = await this.prisma.absence.findMany({
      where: {
        employee_id: employeeId,
        OR: [
          {
            start_date: { lte: endDate },
            end_date: { gte: startDate },
          },
        ],
      },
    });
    return prismaAbsences.map(AbsenceMapper.toDomain);
  }
}
