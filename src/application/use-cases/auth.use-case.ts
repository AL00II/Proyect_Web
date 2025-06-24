import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/database/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from 'src/infrastructure/services/jwt-token.service';

@Injectable()
export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository,
    private readonly tokenService: JwtTokenService
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

    const token = this.tokenService.generate({ 
       sub:user.id, 
       email: user.email

    })

    const { password: _, ...userWithoutPassword } = user;
    return {
          access_token: token
    };
    
  }
  
 
  
}
