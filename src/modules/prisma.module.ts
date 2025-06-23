import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
