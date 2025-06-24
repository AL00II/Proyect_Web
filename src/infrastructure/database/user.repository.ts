import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { RegistrationUserDto } from 'src/application/dto/registration-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: RegistrationUserDto & { password: string }) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password: createUserDto.password,  
        active: createUserDto.active,
      },
    });
  }
}
