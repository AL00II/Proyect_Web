import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UpdateUserInput } from '../../domain/types/update-user-input ';
import * as bcrypt from 'bcrypt';
import { UserOutput } from '../../domain/types/user-output.type';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserInput, currentUserRole: string): Promise<UserOutput> {
    if (currentUserRole !== 'admin') {
      throw new ForbiddenException('Solo el administrador puede editar usuarios.');
    }

    if (data.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw new ConflictException('Correo ya registrado');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);  // Hashear password si viene
    }

    const updated = await this.userRepository.update(id, data); 
    return {
      id: updated.id!,
      name: updated.name,
      last_name: updated.last_name,
      email: updated.email,
      active: updated.active,
      role: updated.role,
      password: '',
    };
  }
}
