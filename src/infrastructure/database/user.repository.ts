import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from '../services/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
