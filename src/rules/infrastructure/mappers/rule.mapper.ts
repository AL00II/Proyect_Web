import { RuleResponseDto } from "src/rules/application/dto/rule-response.dto";
import { Rule } from "../../domain/entities/rule.entity";
import { Rule as PrismaRule } from "../../../../generated/prisma";

export class RuleMapper {
  static toDomain(prismaRule: PrismaRule): Rule {
    return new Rule(
      prismaRule.id,
      prismaRule.name,
      prismaRule.type,
      prismaRule.description,
      prismaRule.valid,
      prismaRule.is_global,    
      prismaRule.employee_id,  
      prismaRule.created_by_id,
      prismaRule.createdAt,    
      prismaRule.updatedAt     
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
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt || null
    };
    }
}