import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { Rule } from '../../domain/entities/rule.entity';
import { RuleMapper } from '../mappers/rule.mapper';
import { IRuleRepository } from '../../domain/interfaces/rule.repository.interface';

@Injectable()
export class PrismaRuleRepository implements IRuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(rule: Rule): Promise<Rule> {
    const dbRule = await this.prisma.rule.create({
      data: {
        name: rule.name,
        type: rule.type,
        description: rule.description,
        valid: rule.valid,
        value: rule.value, 
        is_global: rule.isGlobal,
        employee_id: rule.employeeId,
        created_by_id: rule.createdById,
      },
      include: {
        employee: true,
        created_by: true,
      },
    });

    return RuleMapper.toDomain(dbRule);
  }

  async findByName(name: string): Promise<Rule | null> {
    const dbRule = await this.prisma.rule.findFirst({
      where: { name },
      include: { employee: true, created_by: true },
    });
    return dbRule ? RuleMapper.toDomain(dbRule) : null;
  }

  async findById(id: string): Promise<Rule | null> {
    const dbRule = await this.prisma.rule.findUnique({
      where: { id },
      include: { employee: true, created_by: true },
    });
    return dbRule ? RuleMapper.toDomain(dbRule) : null;
  }

  async findAllGlobal(): Promise<Rule[]> {
    const dbRules = await this.prisma.rule.findMany({
      where: { is_global: true },
      include: {
        employee: true,
        created_by: true,
      },
    });

    return dbRules.map(RuleMapper.toDomain);
  } 

  async update(id: string, data: Partial<Rule>, updatedById: string): Promise<Rule> {
    const dbRule = await this.prisma.rule.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        valid: data.valid,
        value: data.value,
        is_global: data.isGlobal,
        employee_id: data.employeeId,
        updatedAt: new Date(),
      },
      include: {
        employee: true,
        created_by: true,
      },
    });
  return RuleMapper.toDomain(dbRule);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.rule.delete({
      where: { id },
    });
  }

  async getApplicableRulesForEmployee(employeeId: string): Promise<Rule[]> {
    const dbRules = await this.prisma.rule.findMany({
      where: {
        OR: [
          { is_global: true },         
          { employee_id: employeeId } 
        ],
        valid: true
      },
      include: {
        created_by: true,
        employee: true
      }
    });

    return dbRules.map(RuleMapper.toDomain);
  }

}


