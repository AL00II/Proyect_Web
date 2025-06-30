import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/infraestructure/repositories/user.repository';
import { AuthController } from 'src/modules/auth/infrastructure/controllers/auth.controller';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';
import { IUserRepository } from './domain/interfaces/user-repository.interface';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateUserUseCase } from './application/use-cases/update-use-case';
import { UsersController } from '../auth/infrastructure/controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    RegisterUseCase,
    UpdateUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository, RegisterUseCase, UpdateUserUseCase],
})
export class UsersModule {}
