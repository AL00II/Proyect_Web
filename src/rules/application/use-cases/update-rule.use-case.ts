import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';
import { UpdateRuleDto } from '../dto/update-rule.dto';

@Injectable()
export class UpdateRuleUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository
  ) {}

  async execute(id: string, dto: UpdateRuleDto, updatedById: string): Promise<string> {
    const existingRule = await this.ruleRepository.findById(id);
    if (!existingRule) {
      throw new NotFoundException(`Regla con id ${id} no encontrada`);
    }

    await this.ruleRepository.update(id, dto, updatedById);
    return `La regla con id ${id} fue actualizada exitosamente.`;
  }
}
