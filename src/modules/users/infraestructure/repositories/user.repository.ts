import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user-mapper';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()


export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? UserMapper.toEntity(record) : null;
  }

  async create(user: User): Promise<User> {
    const data = {
      ...user,
      id: undefined,
    };

    const created = await this.prisma.user.create({ data });

    return UserMapper.toEntity(created);
  }
}