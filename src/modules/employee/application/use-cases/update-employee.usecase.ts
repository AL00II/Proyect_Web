import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { EmployeeOutput } from '../../domain/types/employee-output';
import { EmployeeUpdateInput } from '../../domain/types/employee-update-input';
import { PhotoUploaderPort } from '../ports/photo-uploader.port';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly repository: IEmployeeRepository,

    @Inject(PhotoUploaderPort)
    private readonly photoUploader: PhotoUploaderPort,
  ) {}

  async execute(
    id: string,
    data: EmployeeUpdateInput,
    updated_by_id: string,
    file?: Express.Multer.File
  ): Promise<EmployeeOutput> {

    // Validar teléfono duplicado
    if (data.phone) {
      const existingPhone = await this.repository.findByPhone(data.phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new BadRequestException('El número de teléfono ya está registrado por otro empleado.');
      }
    }

    // Obtener datos actuales del empleado
    const existing = await this.repository.findEmployeeById(id);
    if (!existing) throw new BadRequestException('Empleado no encontrado.');

    // Manejar foto
    let photoUrl = existing.URL_photo;
    if (file) {
      photoUrl = await this.photoUploader.upload(file.buffer, id);
    }

    // Manejar vector facial
    let facialVector = existing.facial_vector;
    if (data.facial_vector) {
      if (typeof data.facial_vector === 'string') {
        try {
          facialVector = JSON.parse(data.facial_vector);
        } catch {
          throw new BadRequestException('El vector facial no tiene un formato JSON válido.');
        }
      } else if (Array.isArray(data.facial_vector)) {
        facialVector = data.facial_vector;
      } else {
        throw new BadRequestException('El vector facial no tiene un formato válido.');
      }
    }

    // Actualizar empleado
    const updated = await this.repository.update(id, {
      ...data,
      updated_by_id,
      facial_vector: facialVector,
      URL_photo: photoUrl,
    });

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
