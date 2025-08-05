import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserOutput } from '../../domain/types/user-output.type';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserOutput> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id!,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      active: user.active,
      role: user.role,
    };
  }
}
