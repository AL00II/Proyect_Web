import { Module } from "@nestjs/common";
import { RuleController } from "./controllers/rule.controller";
import { CreateRuleUseCase } from "../application/use-cases/create-rule.use-case";
import { PrismaRuleRepository } from "../infrastructure/repositories/rule.prisma.repository";

@Module({
  controllers: [RuleController],
  providers: [
    {
      provide: "RuleRepository", // Token de inyección
      useClass: PrismaRuleRepository,
    },
    CreateRuleUseCase,
  ],
})
export class RuleModule {}