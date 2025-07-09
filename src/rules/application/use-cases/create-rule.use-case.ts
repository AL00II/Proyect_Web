import { Inject, Injectable } from "@nestjs/common";
import { RuleRepository } from "../../domain/interfaces/rule.repository.interface";
import { Rule } from "../../domain/entities/rule.entity";
import { CreateRuleDto } from "../dto/create-rule.dto";
import { RuleResponseDto } from "../dto/rule-response.dto";
import { RuleMapper } from "../../infrastructure/mappers/rule.mapper";

@Injectable()
export class CreateRuleUseCase {
  constructor(
    @Inject('RuleRepository') // Añade este decorador con el token correcto
    private readonly ruleRepository: RuleRepository
  ) {}

  async execute(
    createRuleDto: CreateRuleDto,
    createdById: string
  ): Promise<RuleResponseDto> {
    // Validar que no exista una regla con el mismo nombre
    const existingRule = await this.ruleRepository.findByName(createRuleDto.name);
    if (existingRule) {
      throw new Error("Ya existe una regla con este nombre");
    }

    // Validar que si no es global, tenga un employeeId asociado
    if (!createRuleDto.isGlobal && !createRuleDto.employeeId) {
      throw new Error(
        "Las reglas no globales deben estar asociadas a un empleado"
      );
    }

    const rule = Rule.create(createRuleDto, createdById);
    const createdRule = await this.ruleRepository.create(rule);

    return RuleMapper.toResponse(createdRule);
  }
}