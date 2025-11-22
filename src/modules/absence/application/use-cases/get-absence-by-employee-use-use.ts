import { Injectable, Inject } from '@nestjs/common';
import { IAbsenceRepository } from '../../domain/interfaces/absence-repository.interface';

@Injectable()
export class GetAbsencesByEmployeeUseCase {
  constructor(
    @Inject(IAbsenceRepository)
    private readonly absenceRepository: IAbsenceRepository,
  ) {}

  async execute(employeeId: string) {
    return this.absenceRepository.findByEmployeeId(employeeId);
  }
}
