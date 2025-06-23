import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Controller('auth')
export class AuthController {
  private authUseCase = new AuthUseCase();

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
