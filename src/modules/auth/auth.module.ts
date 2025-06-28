import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthUseCase } from 'src/modules/auth/application/use-cases/auth.use-case';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from 'src/modules/auth/infrastructure/services/jwt-token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

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
  ],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    JwtTokenService,
  ],
})
export class AuthModule {}

