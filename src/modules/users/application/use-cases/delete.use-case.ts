import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
//se medifico el caso de uso para que no devuelva un void 


  async execute(id: string, userRole: string): Promise<boolean> {
  if (userRole !== 'admin') {
    throw new ForbiddenException('Solo un administrador puede eliminar usuarios.');
  }

  const user = await this.userRepository.findById(id);
  if (!user) return false;

  return await this.userRepository.delete(id);
}

}
