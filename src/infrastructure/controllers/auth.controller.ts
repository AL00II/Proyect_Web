import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

@UseGuards()

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authUseCase.execute(body.email, body.password);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
