import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/database/user.repository';
import { RegistrationUserDto } from '../dto/registration-user.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registrationUserDto: RegistrationUserDto) {
    const existingUser = await this.userRepository.findByEmail(registrationUserDto.email);
    if (existingUser) {
      throw new Error('Este correo electrónico ya está registrado.');
    }

    const passwordHash = await bcrypt.hash(registrationUserDto.password, 10);

    const user = await this.userRepository.create({
      ...registrationUserDto,
      password: passwordHash,
    });

    const { password, ...result } = user;
    return result; 
  }
}
