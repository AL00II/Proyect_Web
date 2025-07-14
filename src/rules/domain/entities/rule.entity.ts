export interface EmployeeData {
  id: string;
  name: string;
  last_name: string;
  matricula: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export class Rule {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly description: string | null,
    public readonly valid: boolean,
    public readonly isGlobal: boolean,
    public readonly employeeId: string | null,
    public readonly createdById: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly employee: EmployeeData | null,
    public readonly createdBy: UserData | null,
  ) {}

  static create(props: {
    name: string;
    type: string;
    description?: string;
    valid?: boolean;
    isGlobal?: boolean;
    employeeId?: string;
    createdById: string;
  }): Rule {
    return new Rule(
      '', 
      props.name,
      props.type,
      props.description ?? null,
      props.valid ?? true,
      props.isGlobal ?? false,
      props.employeeId ?? null,
      props.createdById,
      new Date(),
      null,
      null,
      null
    );
  }
}
