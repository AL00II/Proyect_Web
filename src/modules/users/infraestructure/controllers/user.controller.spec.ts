import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { GetUserProfileUseCase } from '../../application/use-cases/get-user-profile.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { ChangePasswordUseCase } from '../../application/use-cases/change-password.use-case';
import { Request } from 'express';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { PrismaService } from '../../../../core/database/prisma.service';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case.ts';
import { UserRepository } from '../repositories/user.repository';

describe('UserController', () => {
  let controller: UserController;
  let getUserProfileUseCase: GetUserProfileUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let changePasswordUseCase: ChangePasswordUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
         PrismaService,
         RegisterUseCase,
         GetUserProfileUseCase,
         DeleteUserUseCase,
         UpdateUserUseCase,
         GetAllUsersUseCase,
         GetUserByIdUseCase,
         ChangePasswordUseCase,
         {
            provide: IUserRepository, 
            useClass: UserRepository,
         },
       ],
    }).compile();

    controller = module.get<UserController>(UserController);
    getUserProfileUseCase = module.get(GetUserProfileUseCase);
    deleteUserUseCase = module.get(DeleteUserUseCase);
    updateUserUseCase = module.get(UpdateUserUseCase);
    getAllUsersUseCase = module.get(GetAllUsersUseCase);
    getUserByIdUseCase = module.get(GetUserByIdUseCase);
    changePasswordUseCase = module.get(ChangePasswordUseCase);
  });

  it('Debe estar definido', () => {
    expect(controller).toBeDefined();
  });


   describe('findAllUsers()', () => {
    it('Debe retornar todos los usuarios', async () => {
      const result = [
        {
          id: '1',
          name: 'Alo',
          last_name: 'Juarez',
          email: 'alo@example.com',
          active: true,
          role: 'admin',
        },
      ];
      const mockReq = { user: { role: 'admin' } } as unknown as Request;

      jest.spyOn(getAllUsersUseCase, 'execute').mockImplementation(async () => result);

      expect(await controller.findAllUsers(mockReq)).toBe(result);
    });
  });

  describe('getProfile()', () => {
    it('Debe retornar el perfil del usuario', async () => {
      const result = {
        id: '1',
        name: 'Alo',
        last_name: 'Juarez',
        email: 'alo@example.com',
        active: true,
        role: 'admin',
      };
      const mockReq = { user: { sub: '1' } } as unknown as Request;

      jest.spyOn(getUserProfileUseCase, 'execute').mockImplementation(async () => result);

      expect(await controller.getProfile(mockReq)).toBe(result);
    });
  });

  describe('findById()', () => {
    it('Debe traer en texto plano el registro de usuario por id', async () => {
      const result = {
        id: 'sasa',
        name: 'Alo Prueba despliegue2',
        last_name: 'Juarez',
        email: 'alo4.admn@example.com',
        active: true,
        role: 'admin',
      };
      const mockReq = { user: { role: 'admin' } } as unknown as Request;

      jest.spyOn(getUserByIdUseCase, 'execute').mockImplementation(async () => result);

      expect(await controller.findById('sasa', mockReq)).toBe(result);
    });
  });

  describe('deleteUser()', () => {
    it('Debe eliminar un usuario', async () => {
      const mockReq = { user: { role: 'admin' } } as unknown as Request;

      jest.spyOn(deleteUserUseCase, 'execute').mockImplementation(async () => true);

      expect(await controller.deleteUser('123', mockReq)).toEqual({ success: true });
    });
  });

  describe('changePassword()', () => {
    it('Debe cambiar la contraseña de un usuario', async () => {
      const dto = { oldPassword: '123', newPassword: '456' };
      const mockReq = { user: { sub: '1' } } as unknown as Request;

      jest.spyOn(changePasswordUseCase, 'execute').mockImplementation(async () => ({ success: true, message: 'Contraseña cambiada correctamente' }));

      expect(await controller.changePassword(mockReq, dto)).toEqual({ success: true, message: 'Contraseña cambiada correctamente' });
    });
  });

  describe('update()', () => {
    it('Debe actualizar un usuario', async () => {
      const result = {
        id: '123',
        name: 'Nuevo Nombre',
        last_name: 'Juarez',
        email: 'alo@example.com',
        active: true,
        role: 'admin',
      };
      const mockReq = { user: { role: 'admin' } } as unknown as Request;

      jest.spyOn(updateUserUseCase, 'execute').mockImplementation(async () => result);

      expect(await controller.update('123', result, mockReq)).toBe(result);
    });
  });
  
});
