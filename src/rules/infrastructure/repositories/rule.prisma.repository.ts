import { Injectable } from "@nestjs/common";
import { Rule } from "../../domain/entities/rule.entity";
import { PrismaService } from "src/core/database/prisma.service";
import { RuleRepository } from "src/rules/domain/interfaces/rule.repository.interface";
import { RuleMapper } from "../mappers/rule.mapper";

@Injectable()
export class PrismaRuleRepository implements RuleRepository {
  constructor(private readonly prisma: PrismaService) {}

async create(rule: Rule): Promise<Rule> {
  const createdRule = await this.prisma.rule.create({
    data: {
      name: rule.name,
      type: rule.type,
      description: rule.description,
      valid: rule.valid,
      is_global: rule.isGlobal,  
      employee_id: rule.employeeId,
      created_by_id: rule.createdById,
      createdAt: rule.createdAt, 
      updatedAt: rule.updatedAt  
    },
  });

  return RuleMapper.toDomain(createdRule);
}

  async findByName(name: string): Promise<Rule | null> {
    const rule = await this.prisma.rule.findFirst({
      where: { name },
    });

    return rule ? RuleMapper.toDomain(rule) : null;
  }
}