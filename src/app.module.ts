import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from 'src/modules/auth/infrastructure/controllers/app.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
