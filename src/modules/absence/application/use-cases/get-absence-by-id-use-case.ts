import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';

@Injectable()
export class GetAbsenceByIdUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute(id: string) {
    const absence = await this.absenceRepository.findById(id);

    if (!absence) {
      throw new NotFoundException(`Ausencia con ID ${id} no encontrada`);
    }

    return absence;
  }
}
