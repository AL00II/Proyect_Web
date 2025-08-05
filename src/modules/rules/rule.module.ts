import { Module } from "@nestjs/common";
import { CreateRuleUseCase } from "./application/use-cases/create-rule.use-case";
import { RuleController } from "./infrastructure/controllers/rule.controller";
import { PrismaService } from "src/core/database/prisma.service";
import { PrismaRuleRepository } from "./infrastructure/repositories/prisma.rule.repository";
import { RulesService } from './rules.service';

@Module({
  controllers: [RuleController],
  providers: [
    PrismaService,
    {
      provide: "RuleRepository", // Token de inyección
      useClass: PrismaRuleRepository,
    },
    CreateRuleUseCase,
    RulesService,
  ],
})
export class RuleModule {}