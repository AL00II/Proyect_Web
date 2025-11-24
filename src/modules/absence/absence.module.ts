import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/database/prisma.module';
import { AbsenceController } from './infrastructure/controllers/absence.controller';
import { AbsenceService } from './absence.service';
import { AbsenceRepository } from './infrastructure/repositories/absence.repository';
import { UpdateAbsenceUseCase } from './application/use-cases/update-absence.use-case';
import { DeleteAbsenceUseCase } from './application/use-cases/delete-absence.use-case';
import { GetAbsenceByIdUseCase } from './application/use-cases/get-absence-by-id-use-case';
import { GetAbsencesByEmployeeUseCase } from './application/use-cases/get-absence-by-employee-use-use';
import { GetAbsencesByStatusUseCase } from './application/use-cases/get-absence-by-status.use-case';
import { GetAllAbsencesUseCase } from './application/use-cases/get-all-absencese.use-case';
import { IAbsenceRepository } from './domain/interfaces/absence-repository.interface';
import { CreateAbsenceUseCase } from './application/use-cases/create-absence.use-case';
import { PrismaService } from '../../core/database/prisma.service';
import { GetUser } from 'src/modules/auth/infrastructure/decorators/get-user.decorator';

@Module({
  imports: [PrismaModule],
  controllers: [AbsenceController],
  providers: [
    AbsenceService,
    PrismaService,
    {
      provide: IAbsenceRepository,
      useClass: AbsenceRepository,
    },
    CreateAbsenceUseCase,
    UpdateAbsenceUseCase,
    DeleteAbsenceUseCase,
    GetAbsenceByIdUseCase,
    GetAbsencesByEmployeeUseCase,
    GetAbsencesByStatusUseCase,
    GetAllAbsencesUseCase,
  ],
  exports: [AbsenceService],
})
export class AbsenceModule {}
