import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthUseCase } from '../../modules/auth/application/use-cases/auth.use-case';
import { RegisterUseCase } from '../../modules/users/application/use-cases/register.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from '../../modules/auth/infrastructure/services/jwt-token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../users/infraestructure/strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { DeviceAuthGuard } from './infrastructure/guards/device-auth.guard';
import { IDeviceRepository } from '../device/domain/interfaces/device-repository.interface';
import { PrismaDeviceRepository } from '../device/infraestructure/repositories/prisma-device.repository';
import { DeviceModule } from '../device/decive.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule,  
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' },
      }),
    }),
    DeviceModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    RegisterUseCase,
    JwtTokenService,
    JwtStrategy,
    AuthService,
    DeviceAuthGuard,
  ],
})
export class AuthModule {}
