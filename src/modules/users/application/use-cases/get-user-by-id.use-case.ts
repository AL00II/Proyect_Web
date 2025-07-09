import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserOutput } from '../../domain/types/user-output.type';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(requestingUserRole: string, id: string): Promise<UserOutput | null> {
    if (requestingUserRole !== 'admin') {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }

    const user = await this.userRepository.findById(id);

    if (!user?.id) return null;

    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      active: user.active,
      role: user.role,
    };
  }
}
