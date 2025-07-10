import { RuleResponseDto } from 'src/rules/application/dto/rule-response.dto';
import { Rule } from '../../domain/entities/rule.entity';

interface DatabaseRule {
  id: string;
  name: string;
  type: string;
  description: string | null;
  valid: boolean;
  is_global: boolean;
  employee_id: string | null;
  created_by_id: string;
  createdAt: Date;
  updatedAt: Date | null;
  employee?: {
    id: string;
    name: string;
    last_name: string;
    matricula: string;
  } | null;
  created_by: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class RuleMapper {
  static toDomain(dbRule: DatabaseRule): Rule {
    return new Rule(
      dbRule.id,
      dbRule.name,
      dbRule.type,
      dbRule.description,
      dbRule.valid,
      dbRule.is_global,
      dbRule.employee_id,
      dbRule.created_by_id,
      dbRule.createdAt,
      dbRule.updatedAt,
      dbRule.employee ? {
        id: dbRule.employee.id,
        name: dbRule.employee.name,
        last_name: dbRule.employee.last_name,
        matricula: dbRule.employee.matricula,
      } : null,
      {
        id: dbRule.created_by.id,
        name: dbRule.created_by.name,
        email: dbRule.created_by.email,
        role: dbRule.created_by.role,
      }
    );
  }

  static toResponse(rule: Rule): RuleResponseDto {
    return {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      description: rule.description || undefined,
      valid: rule.valid,
      isGlobal: rule.isGlobal,
      employeeId: rule.employeeId || null,
      employee: rule.employee || null,
      createdById: rule.createdById,
      createdBy: rule.createdBy,
      createdAt: rule.createdAt,
      updatedAt: rule.updatedAt || null
    };
  }
}