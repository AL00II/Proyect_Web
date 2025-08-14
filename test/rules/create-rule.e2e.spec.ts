import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import * as jwt from 'jsonwebtoken';

describe('Create Rule (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const payload = { id: 'cme83jwrq0000jhgw445air8i', role: 'admin' };
    const secret = process.env.JWT_SECRET || 's$8LjAotW&Y75H7Mvabo6GfJPG@QmbkqkJLg&RJ21'; 
    jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });
  });

  it('Debe crear una regla correctamente', async () => {
    const ruleData = {
      name: 'Regla de prueba00',
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
  });

 it('Error por falta de nombre', async () => {
  const ruleData = {
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
    .expect(400);

  expect(
    res.body.message.some((msg: string) => msg.includes('name'))
  ).toBe(true);
});

it('Error por campo vacio', async () => {
  const ruleData = {
    name: '   ', 
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
    .expect(400);

  expect(
    res.body.message.some((msg: string) => msg.includes('nombre'))
  ).toBe(true);
});


  afterAll(async () => {
    await app.close();
  });
});
