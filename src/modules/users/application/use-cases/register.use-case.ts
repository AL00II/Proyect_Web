import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { RegisterUserInput } from '../../domain/types/register-user-input';
import * as bcrypt from 'bcrypt';
import { UserOutput } from '../../domain/types/user-output.type';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: RegisterUserInput): Promise<UserOutput> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error('Correo ya registrado');{
     if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
     }
      
     const created = await this.userRepository.create(data);

      return {
        id: created.id!,
        name: created.name,
        last_name: created.last_name,
        email: created.email,
        active: created.active,
        role: created.role,
        password: '',
     };
    }  
  }
}

