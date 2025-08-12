import { Module } from '@nestjs/common';
import { PrismaService } from '../.../../../core/database/prisma.service';
import { RuleController } from './infrastructure/controllers/rule.controller';
import { CreateRuleUseCase } from '../rules/application/use-cases/create-rule.use-case';
import { PrismaRuleRepository } from './infrastructure/repositories/prisma.rule.repository';
import { GetRuleByIdUseCase } from '../rules/application/use-cases/get-rule-by-id.use-case';
import { GetGlobalRulesUseCase } from '../rules/application/use-cases/get-global-rules.use-case';
import { UpdateRuleUseCase } from '../rules/application/use-cases/update-rule.use-case';
import { DeleteRuleUseCase } from '../rules/application/use-cases/delete-rule.use-case';

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
    GetGlobalRulesUseCase,
    UpdateRuleUseCase,
    DeleteRuleUseCase
  ],
})
export class RuleModule {}