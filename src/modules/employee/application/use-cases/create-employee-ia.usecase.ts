import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { CreateEmployeeInput } from '../../domain/types/create-employee-input';
import { PhotoUploaderPort } from '../ports/photo-uploader.port';

@Injectable()
export class CreateEmployeeWithIAUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly employeeRepo: IEmployeeRepository,

    @Inject(PhotoUploaderPort)
    private readonly photoUploader: PhotoUploaderPort,
  ) {}

  async execute(
    data: CreateEmployeeInput,
    file: Express.Multer.File,
    createdById: string,
  ) {
    //Crear form-data para IA 
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    // Obtener embedding desde microservicio IA
    const iaResponse = await axios.post(
      `${process.env.IA_SERVICE_URL}/embedding`,
      formData,
      { headers: formData.getHeaders() }
    );

    const embedding = iaResponse.data.embedding;

    // Subir foto  a Cloudinary
    const photoUrl = await this.photoUploader.upload(file.buffer);

    // Crear empleado 
    const employee = await this.employeeRepo.create(data, createdById);

    // Guardar información  del embedding
    const updatedEmployee = await this.employeeRepo.updateFaceData(employee.id, {
      facial_vector: embedding,
      URL_photo: photoUrl,
    });

    return updatedEmployee;
  }
}
