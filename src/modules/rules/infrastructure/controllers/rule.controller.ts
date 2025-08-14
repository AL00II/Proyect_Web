import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateRuleDto } from "src/modules/rules/application/dto/create-rule.dto";
import { RuleResponseDto } from "src/modules/rules/application/dto/rule-response.dto";
import { CreateRuleUseCase } from "src/modules/rules/application/use-cases/create-rule.use-case";

@Controller("rules")
export class RuleController {
  constructor(private readonly createRuleUseCase: CreateRuleUseCase) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.CREATED)
 async create(
  @Body() createRuleDto: CreateRuleDto,
  @Request() req
): Promise<RuleResponseDto> {
  
  
  if (!['admin', 'supervisor'].includes(req.user.role)) {
    throw new ForbiddenException(
      'Solo supervisores y administradores pueden crear reglas'
    );
  }

  const createdById = req.user.id.toString();
  console.log('createdById:', createdById)
  return this.createRuleUseCase.execute(createRuleDto, { id: createdById });
}

}