import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppService } from '../infrastructure/services/app.service';
import { AppController } from 'src/infrastructure/controllers/app.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
