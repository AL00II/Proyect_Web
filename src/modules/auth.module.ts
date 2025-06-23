import { Module } from '@nestjs/common';
import { AuthController } from '../application/controllers/auth.controller';
import { AuthUseCase } from 'src/application/use-cases/auth.use-case';
import { UserRepository } from 'src/infrastructure/database/user.repository';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthUseCase, UserRepository],
})
export class AuthModule {}
