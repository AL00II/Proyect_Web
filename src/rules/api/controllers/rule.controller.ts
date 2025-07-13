import { Controller, Post, Request, Body, Get, Param } from '@nestjs/common';
import { CreateRuleDto } from '../../application/dto/create-rule.dto';
import { CreateRuleUseCase } from '../../application/use-cases/create-rule.use-case';
import { GetRuleByIdUseCase } from '../../application/use-cases/get-rule-by-id.use-case';

@Controller('rules')
export class RuleController {
  constructor(
    private readonly createRuleUseCase: CreateRuleUseCase,
    private readonly getRuleByIdUseCase: GetRuleByIdUseCase,
  ) {}

  @Post()
  async create(@Body() createRuleDto: CreateRuleDto, @Request() req) {
    return this.createRuleUseCase.execute(createRuleDto, {
      id: req.user.id,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getRuleByIdUseCase.execute(id);
  }
}
