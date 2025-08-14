import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';
import { RegistrationUserDto } from '../../../../../src/modules/users/application/dto/registration-user.dto';

import { RegisterUseCase } from '../../../../../src/modules/users/application/use-cases/register.use-case';
import { Public } from '../../../../core/decorators/public.decorator';
import { JwtTokenService } from '../services/jwt-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly tokenService: JwtTokenService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authUseCase.execute(body.email, body.password);
      const token = this.tokenService.generate({
        sub: user.id!,
        email: user.email,
        role: user.role
      });
  
      return {
        access_token: token,
        //user,
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: RegistrationUserDto) {
    try {
      const user = await this.registerUseCase.execute(createUserDto);
      const token = this.tokenService.generate({
        sub: user.id!,
        email: user.email,
        role: user.role,
      });
  
      return {
        access_token: token,
        //user,
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}