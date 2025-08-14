import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import * as jwt from 'jsonwebtoken';

describe('Update Rule (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdRuleId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const payload = { id: 'cme83jwrq0000jhgw445air8i', role: 'admin' };
    const secret =
      process.env.JWT_SECRET ||
      's$8LjAotW&Y75H7Mvabo6GfJPG@QmbkqkJLg&RJ21';
    jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });
  });

  it('Creacion de regla a actualizar', async () => {
    const ruleData = {
      name: `Regla de prueba 900${Date.now()}`,
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

  it('Regla actualizar', async () => {
    const res = await request(app.getHttpServer())
      .put(`/rules/${createdRuleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Regla actualizada' })
      .expect(200);

    expect(res.body).toHaveProperty('id', createdRuleId);
    expect(res.body.name).toBe('Regla actualizada');
  });

  it('No hay token', async () => {
    await request(app.getHttpServer())
      .put(`/rules/${createdRuleId}`)
      .send({ name: 'Cambio sin token' })
      .expect(401);
  });

  it('Datos invalidos', async () => {
    const invalidData = { name: '' };

    const res = await request(app.getHttpServer())
      .put(`/rules/${createdRuleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(invalidData)
      .expect(400);

    expect(Array.isArray(res.body.message)).toBe(true);
  });

  it('Regla no existe', async () => {
    const nonExistentId = 'cme83jwrq9999jhgw445air8i';

    await request(app.getHttpServer())
      .put(`/rules/${nonExistentId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'Regla inexistente',
        type: 'Tipo',
        description: 'Desc',
        valid: true,
        isGlobal: true,
        employeeId: null,
      })
      .expect(404);
  });


  afterAll(async () => {
    await app.close();
  });
});
