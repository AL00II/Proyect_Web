import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserRepository } from 'src/modules/users/infraestructure/repositories/user.repository';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserController } from './infraestructure/controllers/user.controller';
import { DeleteUserUseCase } from './application/use-cases/delete.use-case';
import { IUserRepository } from './domain/interfaces/user-repository.interface';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    RegisterUseCase,
    GetUserProfileUseCase,
    DeleteUserUseCase,
    {
       provide: IUserRepository, 
       useClass: UserRepository,
    },
  ],
  exports: [
    IUserRepository,
    RegisterUseCase,
    GetUserProfileUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
