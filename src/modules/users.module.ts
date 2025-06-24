import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/database/user.repository';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { AuthController } from 'src/infrastructure/controllers/auth.controller';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';

@Module({
  controllers: [AuthController],
  providers: [RegisterUseCase, UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UsersModule {}
