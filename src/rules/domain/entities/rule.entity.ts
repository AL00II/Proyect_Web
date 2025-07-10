import { CreateRuleDto } from 'src/rules/application/dto/create-rule.dto';

interface EmployeeData {
  id: string;
  name: string;
  last_name: string;
  matricula: string;
}

interface UserData {
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
    public readonly createdBy: UserData
  ) {}

  static create(createRuleDto: CreateRuleDto, createdById: string, createdByData: UserData): Rule {
    const now = new Date();
    console.log('[DEBUG] createdById =>', createdById);
    return new Rule(
      '', // ID lo genera Prisma
      createRuleDto.name,
      createRuleDto.type,
      createRuleDto.description || null,
      createRuleDto.valid ?? true,
      createRuleDto.isGlobal ?? false,
      createRuleDto.employeeId || null,
      createdById,
      now,
      null,
      null,
      createdByData
    );
  }
}