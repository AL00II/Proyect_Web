import { Prisma, User as PrismaUser } from '../../../../../generated/prisma';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toEntity(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.name,
      prismaUser.last_name,
      prismaUser.email,
      prismaUser.password,
      prismaUser.active,
      prismaUser.id,
    );
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id ?? '',
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      active: user.active,
      createdAt: new Date(),   
      updatedAt: new Date(),
    };
  }


}
