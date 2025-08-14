import { Injectable, ConflictException, BadRequestException, Inject } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { RuleMapper } from '../../infrastructure/mappers/rule.mapper';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { RuleResponseDto } from '../dto/rule-response.dto';
import { Rule } from '../../domain/entities/rule.entity';

@Injectable()
export class CreateRuleUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository,
  ) {}

  async execute(createRuleDto: CreateRuleDto, user: { id: string }): Promise<RuleResponseDto> {
    const existingRule = await this.ruleRepository.findByName(createRuleDto.name);
    if (existingRule) {
      throw new ConflictException('Ya existe una regla con este nombre');
    }

    if (createRuleDto.isGlobal === false && !createRuleDto.employeeId) {
      throw new BadRequestException('Las reglas no globales deben estar asociadas a un empleado');
    }


    const rule = Rule.create({
      name: createRuleDto.name,         
      type: createRuleDto.type,        
      description: createRuleDto.description, 
      valid: createRuleDto.valid,      
      isGlobal: createRuleDto.isGlobal, 
      employeeId: createRuleDto.employeeId,  
      createdById: user.id,            
    });

    const createdRule = await this.ruleRepository.create(rule);
    return RuleMapper.toResponse(createdRule);
  }
}
