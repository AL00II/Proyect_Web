import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { CreateEmployeeInput } from '../../domain/types/create-employee-input';
import { EmployeeOutput } from '../../domain/types/employee-output';


@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly employeeRpository: IEmployeeRepository,
  ) {}

  async execute(data: CreateEmployeeInput, created_by_id: string): Promise<EmployeeOutput> {
    const existing = await this.employeeRpository.findByMatricula(data.matricula)
    const existingPhone = await this.employeeRpository.findByPhone(data.phone);

    if (existingPhone) {
      throw new BadRequestException('El número de teléfono ya está registrado.');
    }
    if (existing) throw new BadRequestException('Matricula existente.');
    const created = await this.employeeRpository.create(data, created_by_id);

    return {
      id: created.id!,
      created_by_id: created.created_by_id,
      created_at: created.createdAt,
      name: created.name,
      last_name: created.last_name,
      matricula: created.matricula,
      phone: created.phone,
      facial_vector: created.facial_vector,
      URL_photo: created.URL_photo,
      active: created.active,
    };
  }

}
