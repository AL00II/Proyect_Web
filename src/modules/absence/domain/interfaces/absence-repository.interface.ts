import { Absence } from '../entities/absence.entity';
import { CreateAbsenceInput } from '../../domain/types/create-absence-input';
import { UpdateAbsenceInput } from '../../domain/types/update-absence-input';

export abstract class IAbsenceRepository {
  abstract create(data: CreateAbsenceInput): Promise<Absence>;
  abstract update(id: string, data: UpdateAbsenceInput): Promise<Absence>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Absence | null>;
  abstract findByEmployeeId(employeeId: string): Promise<Absence[]>;
  abstract findByStatus(status: string): Promise<Absence[]>;
  abstract findAll(): Promise<Absence[]>;
  abstract findByEmployeeAndDateRange(
    employeeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Absence[]>;
}
