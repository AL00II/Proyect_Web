import { User as PrismaUser } from '../../../../../generated/prisma';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toEntity(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.name,
      prismaUser.last_name,
      prismaUser.email,
      prismaUser.password,
      prismaUser.role,
      prismaUser.active,
      prismaUser.id,
      prismaUser.createdAt,
      prismaUser.updatedAt ?? undefined,
    );
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id ?? '',
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      role: user.role,
      active: user.active,
      createdAt: user.created_at ?? new Date(),
      updatedAt: user.updated_at ?? new Date(),
    };
  }
}
