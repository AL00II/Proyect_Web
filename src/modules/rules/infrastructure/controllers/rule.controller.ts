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
    // Validar que el usuario tenga rol de supervisor o admin
    if (!['admin', 'supervisor'].includes(req.user.role)) {
      throw new ForbiddenException(
        'Solo supervisores y administradores pueden crear reglas'
      );
    }

    // Convertir el ID a string para coincidir con el esquema Prisma
    const createdById = req.user.id.toString();
    return this.createRuleUseCase.execute(createRuleDto, createdById);
  }
}