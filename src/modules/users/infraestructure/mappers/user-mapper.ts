import { Prisma, User as PrismaUser } from '../../../../../generated/prisma';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

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

  static fromUpdateDto(input: UpdateUserDto): Prisma.UserUpdateInput {
    const data: Prisma.UserUpdateInput = {};

    if (input.name !== undefined) data.name = input.name;
    if (input.last_name !== undefined) data.last_name = input.last_name;
    if (input.email !== undefined) data.email = input.email;
    if (input.password !== undefined) data.password = input.password;
    if (input.active !== undefined) data.active = input.active;

    return data;
  }
}
