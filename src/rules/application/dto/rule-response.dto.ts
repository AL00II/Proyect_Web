interface EmployeeDto {
  id: string;
  name: string;
  last_name: string;
  matricula: string;
}

interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

export class RuleResponseDto {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly description?: string;
  readonly valid: boolean;
  readonly isGlobal: boolean;
  readonly employeeId: string | null;
  readonly employee: EmployeeDto | null;
  readonly createdById: string;
  readonly createdBy: UserDto | null;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
}