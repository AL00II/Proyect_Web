import { Inject, Injectable } from '@nestjs/common';
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
    if (existing) throw new Error ("Empleado ya registrado");

      const created = await this.employeeRpository.create({
      ...data,
      created_by_id,
      updated_by_id: null, 
    });


    return {
      created_by_id: created.created_by_id,
      name: created.name,
      last_name: created.last_name,
      matricula: created.matricula,
      facial_vector: created.facial_vector,
      URL_photo: created.URL_photo,
      active: created.active,
      updated_by_id: created.updated_by_id,
    };
  }

}
