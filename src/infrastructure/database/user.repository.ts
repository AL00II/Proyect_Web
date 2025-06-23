import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
