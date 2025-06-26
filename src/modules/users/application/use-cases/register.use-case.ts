import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infraestructure/repositories/user.repository';
import { RegistrationUserDto } from '../dto/registration-user.dto';
import { UserType } from 'src/modules/users/domain/types/user.type';
import { JwtTokenService } from 'src/modules/auth/infrastructure/services/jwt-token.service';
import { access } from 'fs';


@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository,
              private readonly tokenService: JwtTokenService

  ) {}

  async execute(registrationUserDto: RegistrationUserDto) {
    const existingUser = await this.userRepository.findByEmail(registrationUserDto.email);
    if (existingUser) throw new Error('Usuario ya registrado');

    const passwordHash = await bcrypt.hash(registrationUserDto.password, 10);

    const userToSave: UserType = {
      ...registrationUserDto,
      password: passwordHash,
    };

    const user = await this.userRepository.create(userToSave);
    const token = this.tokenService.generate({ 
       sub:user.id, 
       email: user.email

    })
    const { password, ...userWithoutPassword } = user;
    return {
          access_token: token
    };
  }
}
