import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { IUserRepository } from './domain/interfaces/user-repository.interface';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserController } from './infraestructure/controllers/user.controller';
import { UpdateUserUseCase } from './application/use-cases/update-use-case';
import { UserRepository } from './infraestructure/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    RegisterUseCase,
    GetUserProfileUseCase,
    UpdateUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [
    IUserRepository,
    RegisterUseCase,
    GetUserProfileUseCase,
    UpdateUserUseCase,
  ],
})
export class UsersModule {}
