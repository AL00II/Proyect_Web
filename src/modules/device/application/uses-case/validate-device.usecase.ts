import { Injectable } from '@nestjs/common';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';
import { ValidateDeviceInput } from '../../domain/types/validate-device.input';
import { Device } from '../../domain/entities/device.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateDeviceUseCase {
  constructor(private readonly deviceRepo: IDeviceRepository) {}

  async execute(data: ValidateDeviceInput): Promise<Device | null> {
    const device = await this.deviceRepo.findByDeviceId(data.device_id);

    if (!device || !device.is_active) return null;

    const isMatch = await bcrypt.compare(data.token, device.token);
    if (!isMatch) return null;

    // actualizar last_seen_at
    const updated = await this.deviceRepo.updateLastSeen(device.id);

    return updated;
  }
}
