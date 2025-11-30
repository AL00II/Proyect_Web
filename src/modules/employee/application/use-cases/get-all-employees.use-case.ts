
import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { EmployeeOutput } from '../../domain/types/employee-output';


@Injectable()
export class GetAllEmployeesUseCase {
  constructor(
    @Inject(IEmployeeRepository)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(): Promise<EmployeeOutput[]> {
    const employees = await this.employeeRepository.findAllEmployees();

    return employees.map(employee => ({
      created_by_id: employee.created_by_id,
      id: employee.id,
      name: employee.name,
      last_name: employee.last_name,
      matricula: employee.matricula,
      phone: employee.phone,
      facial_vector: employee.facial_vector,
      URL_photo: employee.URL_photo,
      active: employee.active,
      updated_by_id: employee.updated_by_id,
    }));
  }
}
