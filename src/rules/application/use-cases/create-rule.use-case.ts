import { Injectable, ConflictException, BadRequestException, Inject } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { Rule } from '../../domain/entities/rule.entity';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { RuleResponseDto } from '../dto/rule-response.dto';
import { RuleMapper } from '../../infrastructure/mappers/rule.mapper';

@Injectable()
export class CreateRuleUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository,
  ) {}

  async execute(
    createRuleDto: CreateRuleDto,
    user: { id: string; name: string; email: string; role: string }
  ): Promise<RuleResponseDto> {
    const existingRule = await this.ruleRepository.findByName(createRuleDto.name);
    if (existingRule) {
      throw new ConflictException('Ya existe una regla con este nombre');
    }

    const isGlobal = createRuleDto.isGlobal === true;
    if (!isGlobal && !createRuleDto.employeeId) {
      throw new BadRequestException('Las reglas no globales deben estar asociadas a un empleado');
    }

    const rule = Rule.create(createRuleDto, user.id, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const createdRule = await this.ruleRepository.create(rule);
    return RuleMapper.toResponse(createdRule);
  }
}