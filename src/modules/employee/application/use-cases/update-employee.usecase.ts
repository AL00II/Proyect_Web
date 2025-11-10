import { BadRequestException, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { EmployeeOutput } from '../../domain/types/employee-output';
import { EmployeeUpdateInput } from '../../domain/types/employee-update-input';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(private readonly repository: IEmployeeRepository) {}

  async execute(id: string, data: EmployeeUpdateInput): Promise<EmployeeOutput> {

    if (data.phone) {
      const existingPhone = await this.repository.findByPhone(data.phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new BadRequestException('El número de teléfono ya está registrado por otro empleado.');
      }
    }
    const updated = await this.repository.update(id, data);

    return {
      id: updated.id,
      name: updated.name,
      last_name: updated.last_name,
      matricula: updated.matricula,
      phone: updated.phone,
      facial_vector: updated.facial_vector,
      URL_photo: updated.URL_photo,
      active: updated.active,
      created_by_id: updated.created_by_id,
      created_at: updated.createdAt,
      updated_by_id: updated.updated_by_id,
      updated_at: updated.updatedAt,
    };
  }
}
