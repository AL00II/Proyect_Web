import {Controller,Body,Get,Req,Delete,Param,HttpCode,HttpStatus,Patch} from '@nestjs/common';
import { GetUserProfileUseCase } from '../../application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { ChangePasswordDto } from '../../application/dto/change-password.dto';
import { ChangePasswordUseCase } from '../../application/use-cases/change-password.use-case';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase : GetUserByIdUseCase,
    private readonly changePasswordUseCase : ChangePasswordUseCase,
  ) {}

 
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  async findAllUsers(@Req() req: Request): Promise<User[]> {
    return this.getAllUsersUseCase.execute(req.user.role);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: User })
  async getProfile(@Req() req: Request) {
    const userId = req.user.sub;
    return await this.getUserProfileUseCase.execute(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  async findById(@Param('id') id: string, @Req() req: Request): Promise<User | null> {
    return await this.getUserByIdUseCase.execute(req.user.role, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
    schema: { example: { success: true, message: 'Eliminado correctamente' } },
  })
  async deleteUser(@Param('id') id: string, @Req() req: Request): Promise<{ success: boolean }> {
    const result = await this.deleteUserUseCase.execute(id, req.user.role);
    return { success: result };
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Contraseña cambiada exitosamente',
    schema: { example: { success: true, message: 'Cambio correcto' } },
  })
  async changePassword(@Req() req: Request, @Body() dto: ChangePasswordDto) {
    const userId = req.user.sub;
    return await this.changePasswordUseCase.execute(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente', type: User })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: Request) {
    return await this.updateUserUseCase.execute(id, dto, req.user.role);
  }
}

