import { Controller, Post, Body, BadRequestException, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthUseCase } from '../../application/use-cases/auth.use-case';
import { RegistrationUserDto } from '../../../../modules/users/application/dto/registration-user.dto';
import { RegisterUseCase } from '../../../../modules/users/application/use-cases/register.use-case';
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
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response, 
  ) {
    try {
      const user = await this.authUseCase.execute(body.email, body.password);
      const token = this.tokenService.generate({
        sub: user.id!,
        email: user.email,
        role: user.role
      });

      //  cookie HttpOnly
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 2, // 2hrs
      });

      return { message: 'Login exitoso' }; // frontend solo recibe mensaje
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: RegistrationUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.registerUseCase.execute(createUserDto);
      const token = this.tokenService.generate({
        sub: user.id!,
        email: user.email,
        role: user.role,
      });

      // Enviar cookie HttpOnly al registrar
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      });

      return { message: 'Usuario registrado exitosamente' };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logout exitoso' };
  }
}
