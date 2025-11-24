import { Injectable } from '@nestjs/common';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';

@Injectable()
export class DeactivateDeviceUseCase {
  constructor(private readonly deviceRepo: IDeviceRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.deviceRepo.deactivateDevice(id);
  }
}
