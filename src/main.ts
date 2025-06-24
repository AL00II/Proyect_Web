import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  // Aplica el guard de JWT a toda la aplicación
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(3000);
}
bootstrap();
