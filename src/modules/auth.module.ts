import { Module } from '@nestjs/common';
import { AuthController } from '../infrastructure/controllers/auth.controller';
import { AuthUseCase } from 'src/application/use-cases/auth.use-case';
import { UserRepository } from 'src/infrastructure/database/user.repository';
import { PrismaModule } from './prisma.module';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthUseCase, UserRepository, RegisterUseCase],
})
export class AuthModule {}
