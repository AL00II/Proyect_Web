import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
