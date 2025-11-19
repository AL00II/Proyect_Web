import { Injectable, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';

@Injectable()
export class GetAllAbsencesUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute() {
    return this.absenceRepository.findAll();
  }
}
