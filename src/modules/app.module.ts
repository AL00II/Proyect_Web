import { Module } from '@nestjs/common';
import { AppService } from '../infrastructure/services/app.service';
import { AppController } from 'src/application/controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
