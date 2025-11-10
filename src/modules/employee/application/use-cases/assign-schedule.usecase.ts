import { BadRequestException, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/interfaces/employee-repository.interface';
import { IScheduleRepository } from 'src/modules/schedule/domain/interfaces/schedule.repository.interface';

@Injectable()
export class AssignScheduleToEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly scheduleSetRepository: IScheduleRepository,
  ) {}

 async execute(employeeId: string, scheduleSetId: string, userId: string): Promise<boolean> {
    const schedule = await this.scheduleSetRepository.findById(scheduleSetId);
    if (!schedule) {
      throw new BadRequestException('El conjunto horario no existe.');
    }

    const result = await this.employeeRepository.assignSchedule(employeeId, scheduleSetId, userId);

    return result;
  }
}
