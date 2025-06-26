import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/infraestructure/repositories/user.repository';
import { PrismaService } from 'src/core/database/prisma.service';
import { AuthController } from 'src/modules/auth/infrastructure/controllers/auth.controller';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';

@Module({
  controllers: [AuthController],
  providers: [RegisterUseCase, UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UsersModule {}
