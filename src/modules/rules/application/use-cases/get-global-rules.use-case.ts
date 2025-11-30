import { Injectable, Inject } from '@nestjs/common';
import { IRuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { RuleResponseDto } from '../dto/rule-response.dto';
import { RuleMapper } from '../../infrastructure/mappers/rule.mapper';

@Injectable()
export class GetGlobalRulesUseCase {
  constructor(
    private readonly ruleRepository: IRuleRepository
  ) {}

  async execute(): Promise<RuleResponseDto[]> {
    const rules = await this.ruleRepository.findAllGlobal();
    return rules.map(RuleMapper.toResponse);
  }
}
