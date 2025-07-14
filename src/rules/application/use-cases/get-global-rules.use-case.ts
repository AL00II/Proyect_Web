import { Injectable, Inject } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { RuleResponseDto } from '../dto/rule-response.dto';
import { RuleMapper } from '../../infrastructure/mappers/rule.mapper';

@Injectable()
export class GetGlobalRulesUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository
  ) {}

  async execute(): Promise<RuleResponseDto[]> {
    const rules = await this.ruleRepository.findAllGlobal();
    return rules.map(RuleMapper.toResponse);
  }
}
