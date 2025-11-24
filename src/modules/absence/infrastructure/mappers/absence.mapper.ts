import { Absence } from '../../domain/entities/absence.entity';
import { AbsenceResponseDto } from '../../application/dto/absence-response.dto';
import { CreateAbsenceInput } from '../../domain/types/create-absence-input';

export class PrismaAbsence {
  id: string;
  employee_id: string;
  schedule_detail_id: string | null;
  type: string;
  start_date: Date;
  end_date: Date;
  reason: string | null;
  status: string;
  created_by: string;
  created_at: Date;
  updated_by: string | null;
  updated_at: Date | null;
}

export class AbsenceMapper {
  static toDomain(prismaAbsence: any): Absence {
    return new Absence(
      prismaAbsence.id,
      prismaAbsence.employee_id,
      prismaAbsence.schedule_detail_id ?? null,
      prismaAbsence.type,
      prismaAbsence.start_date instanceof Date
        ? prismaAbsence.start_date
        : new Date(prismaAbsence.start_date),
      prismaAbsence.end_date instanceof Date
        ? prismaAbsence.end_date
        : new Date(prismaAbsence.end_date),
      prismaAbsence.reason ?? null,
      prismaAbsence.status ?? 'pending',
      prismaAbsence.created_by,
      prismaAbsence.created_at instanceof Date
        ? prismaAbsence.created_at
        : new Date(prismaAbsence.created_at),
      prismaAbsence.updated_by ?? null,
      prismaAbsence.updated_at
        ? prismaAbsence.updated_at instanceof Date
          ? prismaAbsence.updated_at
          : new Date(prismaAbsence.updated_at)
        : null,
    );
  }

  static toResponse(absence: Absence): AbsenceResponseDto {
    return {
      id: absence.id,
      employeeId: absence.employeeId,
      scheduleDetailId: absence.scheduleDetailId ?? null,
      type: absence.type,
      startDate: absence.startDate,
      endDate: absence.endDate,
      reason: absence.reason ?? null,
      status: absence.status,
      createdBy: absence.createdBy,
      createdAt: absence.createdAt,
      updatedBy: absence.updatedBy ?? null,
      updatedAt: absence.updatedAt ?? null,
    };
  }

  static toPrismaCreate(data: CreateAbsenceInput): any {
    return {
      employee_id: data.employeeId,
      schedule_detail_id: data.scheduleDetailId || null,
      type: data.type,
      start_date: data.startDate,
      end_date: data.endDate,
      reason: data.reason || null,
      status: 'pending',
      created_by: data.createdBy,
    };
  }

  static toPrismaUpdate(data: any): any {
    const updateData: any = {};

    if (data.type !== undefined) updateData.type = data.type;
    if (data.startDate !== undefined)
      updateData.start_date =
        data.startDate instanceof Date
          ? data.startDate
          : new Date(data.startDate);
    if (data.endDate !== undefined)
      updateData.end_date =
        data.endDate instanceof Date ? data.endDate : new Date(data.endDate);
    if (data.reason !== undefined) updateData.reason = data.reason;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.updatedBy !== undefined) updateData.updated_by = data.updatedBy;

    updateData.updated_at = new Date();

    return updateData;
  }
}
