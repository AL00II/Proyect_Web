import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';
import { CreateAbsenceDto } from '../dto/create-absence.dto';
import { PrismaService } from '../../../../core/database/prisma.service';

@Injectable()
export class CreateAbsenceUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(createAbsenceDto: CreateAbsenceDto, userId: string) {
    console.log('CreateAbsenceDto (raw):', createAbsenceDto);
    console.log('userId received in use case:', userId);

    if (!userId) {
      throw new Error('User ID is required');
    }

    const startDate =
      createAbsenceDto.startDate instanceof Date
        ? createAbsenceDto.startDate
        : new Date(createAbsenceDto.startDate);

    const endDate =
      createAbsenceDto.endDate instanceof Date
        ? createAbsenceDto.endDate
        : new Date(createAbsenceDto.endDate);

    const existingAbsences =
      await this.absenceRepository.findByEmployeeAndDateRange(
        createAbsenceDto.employeeId,
        startDate,
        endDate,
      );

    if (existingAbsences.length > 0) {
      throw new ConflictException(
        'El empleado ya tiene una ausencia registrada en este rango de fechas',
      );
    }

    const createInput = {
      employeeId: createAbsenceDto.employeeId,
      scheduleDetailId: createAbsenceDto.scheduleDetailId,
      type: createAbsenceDto.type,
      startDate: startDate,
      endDate: endDate,
      reason: createAbsenceDto.reason,
      createdBy: userId,
    };

    return this.absenceRepository.create(createInput);
  }
}
