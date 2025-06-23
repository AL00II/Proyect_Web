import { Module } from '@nestjs/common';
import { AuthController } from '../application/controllers/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
