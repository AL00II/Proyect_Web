import { Rule } from '../../domain/entities/rule.entity';
import { RuleResponseDto } from '../../application/dto/rule-response.dto';

export class RuleMapper {
  static toDomain(dbRule: any): Rule {
    return new Rule(
      dbRule.id,
      dbRule.name,
      dbRule.type,
      dbRule.description,
      dbRule.valid, 
      dbRule.value,    
      dbRule.is_global,
      dbRule.employee_id,
      dbRule.created_by_id,
      dbRule.createdAt,
      dbRule.updatedAt,
      dbRule.employee ?? null,
      dbRule.created_by ?? null,
    );
  }

  static toResponse(rule: Rule): RuleResponseDto {
    return {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      description: rule.description ?? undefined,
      valid: rule.valid,
      value: rule.value,
      isGlobal: rule.isGlobal,
      employeeId: rule.employeeId,
      employee: rule.employee,
      createdById: rule.createdById,
      createdBy: rule.createdBy,
      createdAt: rule.createdAt,
      updatedAt: rule.updatedAt ?? null,
    };
  }
}
