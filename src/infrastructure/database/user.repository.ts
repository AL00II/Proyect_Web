import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';



@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
