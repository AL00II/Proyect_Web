import { CreateRuleDto } from "src/rules/application/dto/create-rule.dto";

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
    public readonly updatedAt: Date | null
  ) {}

  static create(createRuleDto: CreateRuleDto, createdById: string): Rule {
    const now = new Date();
    return new Rule(
      '', // ID será generado por Prisma con cuid()
      createRuleDto.name,
      createRuleDto.type,
      createRuleDto.description || null,
      createRuleDto.valid !== undefined ? createRuleDto.valid : true,
      createRuleDto.isGlobal !== undefined ? createRuleDto.isGlobal : false,
      createRuleDto.employeeId ? String(createRuleDto.employeeId) : null, // Conversión a string
      createdById,
      now,
      null
    );
  }
}