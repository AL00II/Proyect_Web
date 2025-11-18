import { Employee } from '../entities/employee.entity';
import { CreateEmployeeInput } from '../types/create-employee-input';
import { EmployeeUpdateInput } from '../types/employee-update-input';

export abstract class IEmployeeRepository {
  abstract create(data: CreateEmployeeInput, created_by_id: string): Promise<Employee>;
  abstract findByMatricula(matricula: string): Promise<Employee | null>;
  abstract findByPhone(phone: string): Promise<Employee | null>;
  abstract findAllEmployees(): Promise <Employee []>
  abstract update(id: string, data: EmployeeUpdateInput): Promise<Employee>;
  abstract delete(id: string): Promise<string>;
  abstract assignSchedule(employeeId: string, scheduleSetId: string, updatedBy: string): Promise<boolean>;
  abstract updateFaceData(id: string,data: { facial_vector:number[]; URL_photo: string },): Promise<Employee>;


 
}
