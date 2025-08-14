import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../core/database/prisma.service';
import { RuleController } from '../controllers/rule.controller';
import { GetGlobalRulesUseCase } from '../../application/use-cases/get-global-rules.use-case';
import { PrismaRuleRepository } from '../../infrastructure/repositories/prisma.rule.repository';
import { CreateRuleUseCase } from '../../application/use-cases/create-rule.use-case';
import { GetRuleByIdUseCase } from '../../application/use-cases/get-rule-by-id.use-case';
import { UpdateRuleUseCase } from '../../application/use-cases/update-rule.use-case';
import { DeleteRuleUseCase } from '../../application/use-cases/delete-rule.use-case';
import { RuleResponseDto } from '../../application/dto/rule-response.dto';
import { AppService } from '../../../../app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../../../../src/modules/auth/infrastructure/guards/jwt-auth.guard';

describe('RuleController', () => {
  let controller: RuleController;

  //no tenemos un servicio, vamos a usar un caso de uso
  let getRuleByUseCase: GetRuleByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleController],
       providers: [
        AppService,
            {
              provide: APP_GUARD,
              useClass: JwtAuthGuard,
            },
          PrismaService,
          {
            provide: 'RuleRepository',
            useClass: PrismaRuleRepository,
          },
          CreateRuleUseCase,
          GetRuleByIdUseCase,
          GetGlobalRulesUseCase,
          UpdateRuleUseCase,
          DeleteRuleUseCase
        ],
    }).compile();

    controller = module.get<RuleController>(RuleController);

    //acceder a la instancia del caso de uso
    getRuleByUseCase = module.get<GetRuleByIdUseCase>(GetRuleByIdUseCase);
  });

  it('El controlador debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  //verificar que se tenga una instancia de GetRule
  it('Debe de tener instancia de GetRule', () =>{
    expect(getRuleByUseCase).toBeDefined();
  });

  describe("Interacción entre el controlador y caso de uso",() =>{

    it('Debe devolver la regla', async() => {
      let rule : RuleResponseDto = {
        id: "akdhja",
        name: "Carolina",
        
        type: "Prueba",
        description: "Descripción",
        valid: true,
        isGlobal: true,
        employeeId: null,
        employee: null,
        createdById: "Carolina",
        createdBy:null,
        createdAt: new Date(),
        updatedAt: null,

      }
      

      //simular la ejecución del caso de uso
      jest.spyOn(getRuleByUseCase, "execute").mockImplementation(async () => rule);

      //ejecutar el controlador y comparar la respuesta otenida
      //desde el caso de uso
      expect(await controller.getById("akdhja")).toEqual(rule);


  });
  });
});
