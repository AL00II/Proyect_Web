import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserOutput } from '../../domain/types/user-output.type';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(currentUserRole: string): Promise<UserOutput[]> {
    if (currentUserRole !== 'admin') {
      throw new ForbiddenException('No tienes permisos para ver todos los usuarios');
    }

    const users = await this.userRepository.findAllUsers();

    return users.map(user => ({
      id: user.id!,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      active: user.active,
      role: user.role,
      password: '',
    }));
  }
}
