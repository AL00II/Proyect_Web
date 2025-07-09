import { Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import * as bcrypt from 'bcrypt';
import { ChangePasswordInput } from '../../domain/types/change-password-input';


@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute( userId:string, data: ChangePasswordInput): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findById(userId);
    if (!user)  throw new NotFoundException('Usuario no encontrado');

    const valid = await bcrypt.compare(data.oldPassword, user.password);
    if (!valid) throw new  UnauthorizedException('La contraseña anterior es incorrecta');

    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
    await this.userRepository.update(userId, { password: hashedNewPassword });

    return {
      success: true,
      message: 'Contraseña actualizada correctamente',
    };
  }
}
