import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from 'src/modules/auth/infrastructure/services/jwt-token.service';
import { IUserRepository } from '../../../../../src/modules/users/domain/interfaces/user-repository.interface';

@Injectable()
export class AuthUseCase {
  constructor(
   @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Correo no encontrado');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Contraseña incorrecta');
    }


    const { password: _, ...userWithoutPassword } = user;
    return user;
    
  }
  
 
  
}
