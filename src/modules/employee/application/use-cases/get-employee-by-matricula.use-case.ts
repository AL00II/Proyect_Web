import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { EmployeeOutput } from '../../domain/types/employee-output';


@Injectable()
export class GetEmployeeByMatriculaUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(matricula: string): Promise<EmployeeOutput> {
    const employee = await this.employeeRepository.findByMatricula(matricula);

    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    return {
        created_by_id: employee.created_by_id,
        name: employee.name,
        last_name: employee.last_name,
        matricula: employee.matricula,
        phone: employee.phone,
        facial_vector: employee.facial_vector,
        URL_photo: employee.URL_photo,
        active: employee.active,
        updated_by_id: employee.updated_by_id,
    };
  }
}
