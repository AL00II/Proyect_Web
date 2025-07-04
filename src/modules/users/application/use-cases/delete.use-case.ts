import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
//se medifico el caso de uso para que no devuelva un void 
  async execute(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) return false;

    return await this.userRepository.delete(id);
  }
}
