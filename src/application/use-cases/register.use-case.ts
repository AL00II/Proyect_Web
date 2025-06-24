import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/database/user.repository';
import { RegistrationUserDto } from '../dto/registration-user.dto';
import { UserType } from 'src/domain/types/user.type';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registrationUserDto: RegistrationUserDto) {
    const existingUser = await this.userRepository.findByEmail(registrationUserDto.email);
    if (existingUser) throw new Error('Usuario ya registrado');

    const passwordHash = await bcrypt.hash(registrationUserDto.password, 10);

    const userToSave: UserType = {
      ...registrationUserDto,
      password: passwordHash,
    };

    const user = await this.userRepository.create(userToSave);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
