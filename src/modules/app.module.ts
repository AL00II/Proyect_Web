import { Module } from '@nestjs/common';
import { AppService } from '../infrastructure/services/app.service';
import { AppController } from 'src/infrastructure/controllers/app.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
