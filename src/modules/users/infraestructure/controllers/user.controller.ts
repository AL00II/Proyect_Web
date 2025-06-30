import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { UserResponseDto } from '../../application/dto/user-response.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
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
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserUseCase.execute(id, dto);
  }
}
