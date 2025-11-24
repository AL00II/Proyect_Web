import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { IDeviceRepository } from '../../domain/interfaces/device-repository.interface';
import { Device } from '../../domain/entities/device.entity';
import { DeviceMapper } from '../mappers/device.mapper';
import { CreateDeviceInput } from '../../domain/types/create-device.input';
import { UpdateDeviceInput } from '../../domain/types/update-device.input';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ValidateDeviceInput } from '../../domain/types/validate-device.input';

@Injectable()
export class PrismaDeviceRepository implements IDeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerDevice(data: CreateDeviceInput): Promise<Device> {
    const created = await this.prisma.device.create({ data });
    return DeviceMapper.toEntity(created);
  }

  async deactivateDevice(id: string): Promise<boolean> {
    const updated = await this.prisma.device.update({
      where: { id },
      data: { is_active: false }
    });
    return updated.is_active === false;
  }

  async updateLastSeen(id: string): Promise<Device> {
    const updated = await this.prisma.device.update({
      where: { id },
      data: { last_seen_at: new Date() }
    });

    return DeviceMapper.toEntity(updated);
  }

  async findByName(name: string): Promise<Device | null> {
    const record = await this.prisma.device.findFirst({
      where: { name: { contains: name } } 
    });

    return record ? DeviceMapper.toEntity(record) : null;
  }

  async findAllDevices(): Promise<Device[]> {
    const records = await this.prisma.device.findMany();
    return records.map(DeviceMapper.toEntity);
  }

  async findByDeviceId(device_id: string): Promise<Device | null> {
    const record = await this.prisma.device.findFirst({
      where: { device_id },
    });

    return record ? DeviceMapper.toEntity(record) : null;
  }


}

