import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-use-case';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/modules/users/application/dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      return await this.updateUserUseCase.execute(id, dto);
    } catch (error) {
      throw error;
    }
  }
}
