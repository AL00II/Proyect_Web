import { Test, TestingModule } from '@nestjs/testing';
import { CreateScheduleSetUseCase } from '../../application/use-cases/create-schedule-set.usecase';
import { UpdateScheduleSetUseCase } from '../../application/use-cases/update-schedule-set-usecase';
import { GetAllScheduleSetsUseCase } from '../../application/use-cases/get-all-ScheduleSet.usecase';
import { GetByIScheduleSetdUseCase } from '../../application/use-cases/getby-Id-schedule-set.usecase';
import { DeleteScheduleSetUseCase } from '../../application/use-cases/delete-schedule-set.usecase';
import { ScheduleService } from '../../schedule.service';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { ScheduleController } from './schedule.controller';
import { ScheduleSet } from '../../domain/entities/schedule-set.entity';
import { PrismaService } from '../../../../core/database/prisma.service';

describe('ScheduleController', () => {
  let service: ScheduleService;
  let controller: ScheduleController;

  //caso de uso que se utiliza para la prueba
  let getByIScheduleSetdUseCase: GetByIScheduleSetdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        PrismaService,
        CreateScheduleSetUseCase,
        UpdateScheduleSetUseCase,
        GetAllScheduleSetsUseCase,
        GetByIScheduleSetdUseCase,
        DeleteScheduleSetUseCase,
        {
          provide: IScheduleRepository,
          useClass: ScheduleRepository,
        },
        ScheduleService,
      ],
    }).compile();
    //instancia de service
    controller = module.get<ScheduleController>(ScheduleController);

    //instancia de service
    service = module.get<ScheduleService>(ScheduleService);

    getByIScheduleSetdUseCase = module.get<GetByIScheduleSetdUseCase>(
      GetByIScheduleSetdUseCase,
    );
  });

  it('El controlador debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('Debe tener una instancia de GetScheduleSetUseCase', () => {
    expect(GetByIScheduleSetdUseCase).toBeDefined();
  });

  describe('Interaccción Controlador - servicio', () => {
    it('Debe devolver un registro de schedule-set por ID', async () => {
      let scheduleSet: ScheduleSet = {
        id: 'cmdxlutaf0002l6ffwo3us368',
        name: 'Horario Vespertino',
        description: 'Horario de lunes a viernes',
        is_active: true,
        created_by: 'fjsjfhh',
        created_at: new Date(),
        updated_at: new Date(),
        details: [],
      };

      jest
        .spyOn(getByIScheduleSetdUseCase, 'execute')
        .mockImplementation(async () => scheduleSet);

      expect(await controller.findById('cmdxlutaf0002l6ffwo3us368')).toEqual(
        scheduleSet,
      );
    });
  });

  // describe('Interacción entre controlador y caso de uso'), () => {
  //     it('Debe devolver un registro de schedule-set por ID', async () => {
  //       //ejemplo de estructura de schedule-set
  //       let scheduleSet = (ScheduleSet = {
  //         id: 'cmdxlutaf0002l6ffwo3us368',
  //         name: 'Horario Vespertino',
  //         description: 'Horario de lunes a viernes',
  //         is_active: true,
  //         create_by: 'cmdxlergp0000l6ffqftyxkkxe',
  //       });

  //       jest
  //         .spyOn(getByIScheduleSetdUseCase, 'excute')
  //         .mockImplementation(async () => scheduleSet);
  //     });
  //   };
});
