import { Employee } from '../entities/employee.entity';

export abstract class IEmployeeRepository {
  abstract create(employee: Employee): Promise<Employee>;
  abstract findByMatricula(matricula: string): Promise<Employee | null>;
  abstract findAllEmployees(): Promise <Employee []>
 
}
