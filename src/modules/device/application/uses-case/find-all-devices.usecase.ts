import { Injectable } from '@nestjs/common';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';
import { Device } from '../../domain/entities/device.entity';

@Injectable()
export class FindAllDevicesUseCase {
  constructor(private readonly deviceRepo: IDeviceRepository) {}

  async execute(): Promise<Device[]> {
    return this.deviceRepo.findAllDevices();
  }
}
