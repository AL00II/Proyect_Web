import { UserRepository } from '../../infrastructure/database/user.repository';
import * as bcrypt from 'bcrypt';

export class AuthUseCase {
  private userRepository = new UserRepository();

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
    return userWithoutPassword;
  }
}
