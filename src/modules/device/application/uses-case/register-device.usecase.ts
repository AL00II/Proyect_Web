import { Injectable } from '@nestjs/common';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../../domain/entities/device.entity';
import { CreateDeviceInput } from '../../domain/types/create-device.input';

@Injectable()
export class RegisterDeviceUseCase {
  constructor(private readonly deviceRepo: IDeviceRepository) {}

  async execute(data: CreateDeviceInput): Promise<{ device: Device; token: string }> {
    const rawToken = uuidv4();
    const hashedToken = await bcrypt.hash(rawToken, 10);

  
    const device = await this.deviceRepo.registerDevice({
      ...data,
      token: hashedToken, 
    });

    return { device, token: rawToken };
  }
}
