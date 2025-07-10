import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { RuleRepository } from 'src/rules/domain/interfaces/rule.repository.interface';
import { Rule } from '../../domain/entities/rule.entity';
import { RuleMapper } from '../mappers/rule.mapper';

@Injectable()
export class PrismaRuleRepository implements RuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(rule: Rule): Promise<Rule> {
    const dbRule = await this.prisma.rule.create({
      data: {
        name: rule.name,
        type: rule.type,
        description: rule.description,
        valid: rule.valid,
        is_global: rule.isGlobal,
        employee_id: rule.employeeId,
        created_by_id: rule.createdById
      },
      include: {
        employee: true,
        created_by: true
      }
    });

    return RuleMapper.toDomain(dbRule);
  }

  async findByName(name: string): Promise<Rule | null> {
    const dbRule = await this.prisma.rule.findFirst({
      where: { name },
      include: {
        employee: true,
        created_by: true
      }
    });

    return dbRule ? RuleMapper.toDomain(dbRule) : null;
  }
}
