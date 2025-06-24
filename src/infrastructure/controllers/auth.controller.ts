import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';
import { RegistrationUserDto } from 'src/application/dto/registration-user.dto';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authUseCase.execute(body.email, body.password);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: RegistrationUserDto) {
    try {
      const user = await this.registerUseCase.execute(createUserDto);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
