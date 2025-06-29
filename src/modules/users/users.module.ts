import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/infraestructure/repositories/user.repository';
import { AuthController } from 'src/modules/auth/infrastructure/controllers/auth.controller';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';
import { IUserRepository } from './domain/interfaces/user-repository.interface';
import { PrismaService } from 'src/core/database/prisma.service';
import { AuthUseCase } from '../auth/application/use-cases/auth.use-case';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';



@Module({
  controllers: [],
  providers: [
    PrismaService,
    RegisterUseCase, 
    GetUserProfileUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
   
  ],
  exports: [IUserRepository, RegisterUseCase, GetUserProfileUseCase]
})
export class UsersModule {}
