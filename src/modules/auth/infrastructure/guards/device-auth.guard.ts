import {CanActivate, ExecutionContext,Injectable,UnauthorizedException,ForbiddenException} from '@nestjs/common';
import { IDeviceRepository } from 'src/modules/device/domain/interfaces/device-repository.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class DeviceAuthGuard implements CanActivate {
  constructor(private readonly deviceRepository: IDeviceRepository) {}

 async canActivate(context: ExecutionContext): Promise<boolean> {
  const req = context.switchToHttp().getRequest();

  const deviceId = req.headers['x-device-id'];
  const deviceToken = req.headers['x-device-token'];
  if (!deviceId || !deviceToken) {
    throw new UnauthorizedException('Device headers missing');
  }

  const device = await this.deviceRepository.findByDeviceId(deviceId);

  if (!device) {
    throw new UnauthorizedException('Device not registered');
  }

  const isValid = await bcrypt.compare(deviceToken, device.token);

  if (!isValid) {
    throw new ForbiddenException('Invalid device token');
  }

  await this.deviceRepository.updateLastSeen(device.id);

  req.device = {
    id: device.id,
    name: device.name,
  };

  return true;
}

}