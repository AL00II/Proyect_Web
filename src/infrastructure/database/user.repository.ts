import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserType } from 'src/domain/types/user.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: UserType) {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}
