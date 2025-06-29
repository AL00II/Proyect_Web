import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/modules/users/application/use-cases/get-user-profile.use-case';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly getUserProfileUseCase: GetUserProfileUseCase) {}

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
}
