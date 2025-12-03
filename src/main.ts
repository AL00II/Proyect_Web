import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './modules/auth/infrastructure/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { DateTimezoneInterceptor } from './core/interceptors/date-timezone.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Agregar cookie-parser
  app.use(cookieParser());
  // Interceptor global para fechas
   app.useGlobalInterceptors(new DateTimezoneInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Tempo-Track')
    .setDescription('Documentación de la API para el proyecto Tempo-Track')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000', // frontend
      'http://localhost:4000', //checador
    ],
    credentials: true, 
  });

  await app.listen(3001);
}
bootstrap();
