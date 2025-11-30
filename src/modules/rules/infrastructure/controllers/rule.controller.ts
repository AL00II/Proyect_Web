import { Controller, Post, Request, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateRuleDto } from '../../application/dto/create-rule.dto';
import { CreateRuleUseCase } from '../../application/use-cases/create-rule.use-case';
import { GetRuleByIdUseCase } from '../../application/use-cases/get-rule-by-id.use-case';
import { GetGlobalRulesUseCase } from '../../../../modules/rules/application/use-cases/get-global-rules.use-case';
import { UpdateRuleDto } from '../../../../modules/rules/application/dto/update-rule.dto';
import { UpdateRuleUseCase } from '../../../../modules/rules/application/use-cases/update-rule.use-case';
import { DeleteRuleUseCase } from '../../../../modules/rules/application/use-cases/delete-rule.use-case';

@Controller('rules')
export class RuleController {
  constructor(
    private readonly createRuleUseCase: CreateRuleUseCase,
    private readonly getRuleByIdUseCase: GetRuleByIdUseCase,
    private readonly getGlobalRulesUseCase: GetGlobalRulesUseCase,
    private readonly updateRuleUseCase: UpdateRuleUseCase,
    private readonly deleteRuleUseCase: DeleteRuleUseCase,
  ) {}

  @Post('create')
  async create(@Body() createRuleDto: CreateRuleDto, @Request() req) {
    return this.createRuleUseCase.execute(createRuleDto, {
      id: req.user.sub,
    });
  }

  @Get('global')
  async getGlobalRules() {
    return this.getGlobalRulesUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getRuleByIdUseCase.execute(id);
  }
  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRuleDto,
    @Request() req
  ) {
    return this.updateRuleUseCase.execute(id, dto, req.user.sub);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteRuleUseCase.execute(id);
  }


  
}
