import { Module } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserController } from './infraestructure/controllers/user.controller';
import { DeleteUserUseCase } from './application/use-cases/delete.use-case';
import { IUserRepository } from './domain/interfaces/user-repository.interface';
import { UpdateUserUseCase } from './application/use-cases/update-use-case';
import { UserRepository } from './infraestructure/repositories/user.repository';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case.ts';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';
import { PrismaService } from 'src/core/database/prisma.service';
import { PrismaRuleRepository } from 'src/rules/infrastructure/repositories/rule.prisma.repository';


@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaRuleRepository,
    RegisterUseCase,
    GetUserProfileUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    ChangePasswordUseCase,
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
    UpdateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    ChangePasswordUseCase,
  ],
})
export class UsersModule {}
