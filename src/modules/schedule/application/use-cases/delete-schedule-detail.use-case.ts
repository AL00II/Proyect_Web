/*esto esta en proceso para la implementacion del delete

import { Injectable } from '@nestjs/common';
import { IDScheduleRepository } from '../../domain/interfaces/schedule-details-interface';


@Injectable()
export class DeleteScheduleDetailUseCase {
  constructor(private readonly repository: IDScheduleRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}*/