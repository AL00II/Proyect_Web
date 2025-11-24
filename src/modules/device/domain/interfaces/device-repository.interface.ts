import { CreateDeviceInput } from "../types/create-device.input";
import { Device } from "../entities/device.entity";
import { ValidateDeviceInput } from "../types/validate-device.input";

export abstract class IDeviceRepository {
  abstract registerDevice(data: CreateDeviceInput): Promise<Device>;
  abstract deactivateDevice(id: string): Promise<boolean>;
  abstract findByName(name: string): Promise<Device | null>;
  abstract findAllDevices(): Promise<Device[]>;
  abstract findByDeviceId(device_id: string): Promise<Device | null>;
  abstract updateLastSeen(id: string): Promise<Device>;

}
