import { Module } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RuleController } from './controllers/rule.controller';
import { CreateRuleUseCase } from '../application/use-cases/create-rule.use-case';
import { PrismaRuleRepository } from '../infrastructure/repositories/prisma.rule.repository';

@Module({
  controllers: [RuleController],
  providers: [
    PrismaService,
    {
      provide: 'RuleRepository',
      useClass: PrismaRuleRepository,
    },
    CreateRuleUseCase,
  ],
})
export class RuleModule {}