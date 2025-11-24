import { Injectable, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';

@Injectable()
export class GetAbsencesByStatusUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute(status: string) {
    return this.absenceRepository.findByStatus(status);
  }
}
