
import {Controller,Body,Get,Req,Delete,Param,HttpCode,HttpStatus,Patch} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case.ts';
import { UserOutput } from '../../domain/types/user-output.type';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.use-case';


@Controller('users')
export class UserController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly getUserById : GetUserByIdUseCase,
  ) {}

  
  @Get()
  async findAllUsers(@Req() req: Request): Promise<UserOutput[]> {
    return this.getAllUsers.execute(req.user.role);
  }

  @Get('me')
  async getProfile(@Req() req: Request) {
    const userId = req.user.sub;
    return await this.getUserProfileUseCase.execute(userId);
  }


  @Get(':id')
  async findById(@Param('id') id: string, @Req() req: Request): Promise<UserOutput | null> {
    return this.getUserById.execute(req.user.role, id);
  }



  //e l metodo dsevuelve el boolean y se ajusta el tipo de retorno
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req: Request): Promise<{ success: boolean }> {
  const result = await this.deleteUserUseCase.execute(id, req.user.role);
  return { success: result };
}


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: Request) {
  return await this.updateUserUseCase.execute(id, dto, req.user.role);
}



}
