import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { CreateEmployeeInput } from '../../domain/types/create-employee-input';
import { EmployeeOutput } from '../../domain/types/employee-output';
import { PhotoUploaderPort } from '../ports/photo-uploader.port';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly employeeRepository: IEmployeeRepository,

    @Inject(PhotoUploaderPort)
    private readonly photoUploader: PhotoUploaderPort,
  ) {}

  async execute(
    data: CreateEmployeeInput,
    createdById: string,
    file?: Express.Multer.File
  ): Promise<EmployeeOutput> {

    // Validaciones iniciales
    const existing = await this.employeeRepository.findByMatricula(data.matricula);
    const existingPhone = await this.employeeRepository.findByPhone(data.phone);

    if (existingPhone) throw new BadRequestException('El número de teléfono ya está registrado.');
    if (existing) throw new BadRequestException('Matricula existente.');

    if (!file) {
      throw new BadRequestException('La fotografía es obligatoria.');
    }

    let parsedVector: number[] | null = null;

    if (!data.facial_vector) {
      throw new BadRequestException('El vector facial es obligatorio.');
    }
    if (typeof data.facial_vector === 'string') {
      try {
        parsedVector = JSON.parse(data.facial_vector);
      } catch {
        throw new BadRequestException('El vector facial no tiene un formato JSON válido.');
      }
    } else if (Array.isArray(data.facial_vector)) {
      parsedVector = data.facial_vector;
    } else {
      throw new BadRequestException('El vector facial no tiene un formato válido.');
    }

    if (!Array.isArray(parsedVector)) {
      throw new BadRequestException('El vector facial debe ser un arreglo.');
    }

    // Crear empleado sin datos faciales todavía
    const employee = await this.employeeRepository.create(
      {
        ...data,
        facial_vector: null,
        URL_photo: null,
      },
      createdById
    );

    // Subir foto a storage
    const photoUrl = await this.photoUploader.upload(file.buffer, employee.id);

    // Guardar vector y URL
    const updated = await this.employeeRepository.updateFaceData(employee.id, {
      facial_vector: parsedVector,
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
      created_at: updated.createdAt
    };
  }
}
