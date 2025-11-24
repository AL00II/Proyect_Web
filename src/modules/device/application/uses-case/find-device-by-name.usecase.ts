import { Injectable } from '@nestjs/common';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';
import { Device } from '../../domain/entities/device.entity';

@Injectable()
export class FindDeviceByNameUseCase {
  constructor(private readonly deviceRepo: IDeviceRepository) {}

  async execute(name: string): Promise<Device | null> {
    return this.deviceRepo.findByName(name);
  }
}
