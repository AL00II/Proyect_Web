import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { RuleMapper } from '../../infrastructure/mappers/rule.mapper';
import { RuleResponseDto } from '../dto/rule-response.dto';

@Injectable()
export class GetRuleByIdUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository,
  ) {}

  async execute(id: string): Promise<RuleResponseDto> {
    const rule = await this.ruleRepository.findById(id);
    if (!rule) throw new NotFoundException(`Regla con ID ${id} no encontrada`);
    return RuleMapper.toResponse(rule);
  }
}
