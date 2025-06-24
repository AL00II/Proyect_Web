import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../infrastructure/database/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Correo no encontrado');
    } 
    //Debido a que la enciptacion era un problema tuve que forzar el acceso comentando los siguientes lineas //const match = await bcrypt.compare(password, user.password); if (!match) { throw new Error('Contraseña incorrecta');} para que me mostrara mediante consola si efectivamente el JWT funconaba que es lo que esta abajo del mensaje a imprimir para poder forzar el acceso nota: descomentar los console para verificar 

   /* console.log('Password en base de datos:', user.password);
    console.log('Password ingresada:', password);
    */
             
   const match = await bcrypt.compare(password, user.password);

    if (!match) {
   throw new Error('Contraseña incorrecta');
    }

    //solo para testear que efectivamente el JWT funcione
   //console.log('SALTANDO bcrypt, forzando el acceso....');

    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    
    return {
      access_token: token,
    };
  }
}
