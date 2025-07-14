import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { RuleRepository } from '../../domain/interfaces/rule.repository.interface';

@Injectable()
export class DeleteRuleUseCase {
  constructor(
    @Inject('RuleRepository')
    private readonly ruleRepository: RuleRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const rule = await this.ruleRepository.findById(id);
    if (!rule) {
      throw new NotFoundException(`Regla con id ${id} no encontrada`);
    }

    await this.ruleRepository.delete(id);

    return `✅ La regla con id ${id} fue eliminada exitosamente.`;
  }
}
