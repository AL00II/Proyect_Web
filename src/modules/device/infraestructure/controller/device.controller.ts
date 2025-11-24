import { Controller, Post, Body, Patch, Param, Get, Req } from '@nestjs/common';
import { CreateDeviceDto } from '../../application/dtos/create-device.dto';
import { ValidateDeviceDto } from '../../application/dtos/validate-device.dto';
import { RegisterDeviceUseCase } from '../../application/uses-case/register-device.usecase';
import { DeactivateDeviceUseCase } from '../../application/uses-case/deactivate-device.usecase';
import { FindDeviceByNameUseCase } from '../../application/uses-case/find-device-by-name.usecase';
import { FindAllDevicesUseCase } from '../../application/uses-case/find-all-devices.usecase';
import { ValidateDeviceUseCase } from '../../application/uses-case/validate-device.usecase';

@Controller('devices')
export class DeviceController {
  constructor(
    private readonly registerDevice: RegisterDeviceUseCase,
    private readonly deactivateDevice: DeactivateDeviceUseCase,
    private readonly findByName: FindDeviceByNameUseCase,
    private readonly findAll: FindAllDevicesUseCase,
    private readonly validateDevice: ValidateDeviceUseCase
  ) {}

    @Post()
    async register(@Body() dto: CreateDeviceDto, @Req() req: any) {
    const userId = req.user.sub; // extraído del JWT
    const result = await this.registerDevice.execute({
        ...dto,
        created_by_id: userId, 
    });
    return {
        device: result.device,
        token: result.token 
    };
    }

  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    return this.deactivateDevice.execute(id);
  }

  @Get('search/:name')
  async searchByName(@Param('name') name: string) {
    return this.findByName.execute(name);
  }

  @Get()
  async getAll() {
    return this.findAll.execute();
  }

  @Post('validate')
  async validate(@Body() dto: ValidateDeviceDto) {
    return this.validateDevice.execute(dto);
  }
}
