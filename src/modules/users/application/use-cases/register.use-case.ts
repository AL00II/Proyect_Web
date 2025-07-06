import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { RegisterUserInput } from '../../domain/types/register-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: RegisterUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error('Correo ya registrado');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.last_name,
      data.email,
      hashedPassword,
      data.role,
      data.active,
    );

    return await this.userRepository.create(user);
  }
}
