import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAllUsers(): Promise<User[]>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  //se cambios el tipo de retorno para que sea un bboolean
  abstract delete(id: string): Promise<boolean> ;

}
