import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../infrastructure/controllers/auth.controller';
import { AuthUseCase } from 'src/application/use-cases/auth.use-case';
import { UserRepository } from 'src/infrastructure/database/user.repository';
import { JwtStrategy } from 'src/infrastructure/strategies/jwt.strategy';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule, 
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXP'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    UserRepository,
    JwtStrategy,
  ],
})
export class AuthModule {}
