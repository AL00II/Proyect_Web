import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { IDeviceRepository } from "./domain/interfaces/device-repository.interface";
import { PrismaDeviceRepository } from "./infraestructure/repositories/prisma-device.repository";
import { DeviceAuthGuard } from "../auth/infrastructure/guards/device-auth.guard";
import { DeviceController } from "./infraestructure/controller/device.controller";
import { RegisterDeviceUseCase } from "./application/uses-case/register-device.usecase";
import { FindAllDevicesUseCase } from "./application/uses-case/find-all-devices.usecase";
import { FindDeviceByNameUseCase } from "./application/uses-case/find-device-by-name.usecase";
import { ValidateDeviceUseCase } from "./application/uses-case/validate-device.usecase";
import { DeactivateDeviceUseCase } from "./application/uses-case/deactivate-device.usecase";

@Module({

    controllers: [DeviceController],
    providers: [
    PrismaService,
    RegisterDeviceUseCase,
    FindAllDevicesUseCase,
    FindDeviceByNameUseCase,
    ValidateDeviceUseCase,
    DeactivateDeviceUseCase,
    {
      provide: IDeviceRepository, 
      useClass: PrismaDeviceRepository,
    },
    DeviceAuthGuard,
  ],
  exports: [
    {
      provide: IDeviceRepository,
      useClass: PrismaDeviceRepository,
    },
  ],
})
export class DeviceModule {}
