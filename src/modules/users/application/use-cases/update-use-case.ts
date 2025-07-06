import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserInput } from '../../domain/types/update-user-input ';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserInput): Promise<User> {
    if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
    }
    const updatedUser = await this.userRepository.update(id, data);
    return updatedUser;

 
  }
}
