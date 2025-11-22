import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';
import { UpdateAbsenceDto } from '../dto/update-absence.dto';

@Injectable()
export class UpdateAbsenceUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute(
    id: string,
    updateAbsenceDto: UpdateAbsenceDto,
    userId: string,
  ) {
    const existingAbsence = await this.absenceRepository.findById(id);

    if (!existingAbsence) {
      throw new NotFoundException(`Ausencia con ID ${id} no encontrada`);
    }

    return this.absenceRepository.update(id, {
      ...updateAbsenceDto,
      updatedBy: userId,
    });
  }
}
