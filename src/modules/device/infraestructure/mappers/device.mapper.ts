import { Device } from '../../domain/entities/device.entity';
import { Device as PrismaDevice } from '../../../../../generated/prisma';

export class DeviceMapper {
  static toEntity(prisma: PrismaDevice): Device {
    return new Device(
      prisma.id,
      prisma.name!,
      prisma.token,
      prisma.device_id!,
      prisma.is_active,
      prisma.last_seen_at,
      prisma.created_at,
      prisma.created_by_id
    );
  }

  static toPersistence(device: Device) {
    return {
      name: device.name,
      token: device.token,
      device_id: device.device_id,
      is_active: device.is_active,
      last_seen_at: device.last_seen_at,
      created_by_id: device.created_by_id
    };
  }
}
