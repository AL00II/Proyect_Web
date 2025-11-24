import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';

@Injectable()
export class DeleteAbsenceUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute(id: string) {
    const existingAbsence = await this.absenceRepository.findById(id);

    if (!existingAbsence) {
      throw new NotFoundException(`Ausencia con ID ${id} no encontrada`);
    }

    return this.absenceRepository.delete(id);
  }
}
