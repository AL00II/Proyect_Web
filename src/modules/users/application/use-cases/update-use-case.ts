import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserResponseDto } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userRepository.update(id, dto);
  }
}
