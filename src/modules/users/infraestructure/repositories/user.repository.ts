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

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? UserMapper.toEntity(record) : null;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(UserMapper.toEntity);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toEntity(updatedUser);
  }
}
