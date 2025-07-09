
import {Controller,Body,Get,Req,Delete,Param,HttpCode,HttpStatus,Patch} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case.ts';
import { UserOutput } from '../../domain/types/user-output.type';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';
import { ChangePasswordDto } from '../../application/dto/change-password.dto';
import { ChangePasswordUseCase } from '../../application/use-cases/change-password.use-case';


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
  async findAllUsers(@Req() req: Request): Promise<UserOutput[]> {
    return this.getAllUsersUseCase.execute(req.user.role);
  }

  @Get('me')
  async getProfile(@Req() req: Request) {
    const userId = req.user.sub;
    return await this.getUserProfileUseCase.execute(userId);
  }


  @Get(':id')
  async findById(@Param('id') id: string, @Req() req: Request): Promise<UserOutput | null> {
    return this.getUserByIdUseCase.execute(req.user.role, id);
  }



  //e l metodo dsevuelve el boolean y se ajusta el tipo de retorno
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req: Request): Promise<{ success: boolean }> {
  const result = await this.deleteUserUseCase.execute(id, req.user.role);
  return { success: result };
}

  @Patch('change-password')
  async changePassword(@Req() req:Request,@Body() dto: ChangePasswordDto ) {
    const userId = req.user.sub;
    return await this.changePasswordUseCase.execute(userId, dto);
  }



  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: Request) {
  return await this.updateUserUseCase.execute(id, dto, req.user.role);
}



}
