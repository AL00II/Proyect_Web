import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import * as jwt from 'jsonwebtoken';

describe('Delete Rule (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdRuleId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
89
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    
    const payload = { id: 'cme83jwrq0000jhgw445air8i', role: 'admin' };
    const secret = process.env.JWT_SECRET || 's$8LjAotW&Y75H7Mvabo6GfJPG@QmbkqkJLg&RJ21'; 
    jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });

  });

  it('Debe crear una regla correctamente', async () => {
    const ruleData = {
      name: 'Regla de prueba80',
      type: 'Tipo ejemplo',
      description: 'Descripción de prueba',
      valid: true,
      isGlobal: true,
      employeeId: null,
    };

    const res = await request(app.getHttpServer())
      .post('/rules')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(ruleData)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(ruleData.name);
    createdRuleId = res.body.id;
  });


  it('Debe eliminar una regla', async () => {
    await request(app.getHttpServer())
      .delete(`/rules/${createdRuleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('La regla no existe', async () => {
  const nonExistingId = 'cme83jwrq9999jhgw445air8i'; 

  const res = await request(app.getHttpServer())
    .delete(`/rules/${nonExistingId}`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(404);

  expect(res.body.message).toContain('no encontrada');

});

it('No se envio un token', async () => {
  await request(app.getHttpServer())
    .delete(`/rules/${createdRuleId}`)
    .expect(401);
});

it('El id no se validó', async () => {
  const invalidId = 'id_invalido';

  const res = await request(app.getHttpServer())
    .delete(`/rules/${invalidId}`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(404);

  expect(res.body.message).toContain('id'); 
});


  afterAll(async () => {
    await app.close();
  });
});
