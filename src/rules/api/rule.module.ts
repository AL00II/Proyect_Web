import { Module } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RuleController } from './controllers/rule.controller';
import { CreateRuleUseCase } from '../application/use-cases/create-rule.use-case';
import { PrismaRuleRepository } from '../infrastructure/repositories/prisma.rule.repository';
import { GetRuleByIdUseCase } from '../application/use-cases/get-rule-by-id.use-case';
import { GetGlobalRulesUseCase } from '../application/use-cases/get-global-rules.use-case';

@Module({
  controllers: [RuleController],
  providers: [
    PrismaService,
    {
      provide: 'RuleRepository',
      useClass: PrismaRuleRepository,
    },
    CreateRuleUseCase,
    GetRuleByIdUseCase,
    GetGlobalRulesUseCase
  ],
})
export class RuleModule {}