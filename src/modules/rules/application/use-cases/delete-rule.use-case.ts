import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IRuleRepository } from '../../domain/interfaces/rule.repository.interface';

@Injectable()
export class DeleteRuleUseCase {
  constructor(
    private readonly ruleRepository: IRuleRepository,
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
