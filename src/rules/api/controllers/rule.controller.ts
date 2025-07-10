import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRuleDto } from 'src/rules/application/dto/create-rule.dto';
import { CreateRuleUseCase } from 'src/rules/application/use-cases/create-rule.use-case';

@Controller('rules')
export class RuleController {
  constructor(private readonly createRuleUseCase: CreateRuleUseCase) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createRuleDto: CreateRuleDto,
    @Request() req
  ) {
    return this.createRuleUseCase.execute(createRuleDto, {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  }
}