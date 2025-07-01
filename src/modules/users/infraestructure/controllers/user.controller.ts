
import {Controller,Body,Get,Req,Delete,Param,HttpCode,HttpStatus,Patch} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { DeleteUserUseCase } from '../../application/use-cases/delete.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';


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



  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, dto);
    return this.formatUserResponse(user);
  }

  private formatUserResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      active: user.active,
    };

  }
}
