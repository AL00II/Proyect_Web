
import {Controller,Body,Get,Req,Delete,Param,HttpCode,HttpStatus,Patch} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get('me')
  async getProfile(@Req() req: Request) {
    const userId = req.user.sub;
    const user = await this.getUserProfileUseCase.execute(userId);

    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      active: user.active,
    };
  }


//e l metodo dsevuelve el boolean y se ajusta el tipo de retorno
async deleteUser(@Param('id') id: string): Promise<{ success: boolean }> {
  const result = await this.deleteUserUseCase.execute(id);
  return { success: result };
}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, data);
    return user;
  }


}
