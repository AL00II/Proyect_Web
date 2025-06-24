import { Module } from '@nestjs/common';
import { AuthController } from '../infrastructure/controllers/auth.controller';
import { AuthUseCase } from 'src/application/use-cases/auth.use-case';
import { UserRepository } from 'src/infrastructure/database/user.repository';
import { PrismaModule } from './prisma.module';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from 'src/infrastructure/services/jwt-token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    UserRepository,
    RegisterUseCase,
    JwtTokenService,
  ],
})
export class AuthModule {}
