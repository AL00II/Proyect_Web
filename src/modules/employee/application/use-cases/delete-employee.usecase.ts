import { Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';


@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private readonly repository: IEmployeeRepository) {}

  async execute(id: string): Promise<string> {
    await this.repository.delete(id);
    return `Empleado ${id} eliminado correctamente`;
  }
}
