import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Get Global Rules (E2E)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: process.env.TEST_USER, password: process.env.TEST_PWD })
      .expect(201);

    jwtToken = loginResponse.body.access_token;
  });

  it('Debe listar las reglas globales', async () => {
    const res = await request(app.getHttpServer())
      .get('/rules/global')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('No se envia un token', async () => {
  await request(app.getHttpServer())
    .get('/rules/global')
    .expect(401);
});

it('Token invalido', async () => {
  await request(app.getHttpServer())
    .get('/rules/global')
    .set('Authorization', 'Bearer token_invalido')
    .expect(401);
});

it('Usuario sin permisos', async () => {
  const payload = { id: 'cme83jwrq0000jhgw445air8i', role: 'usuario' };
  const secret = process.env.JWT_SECRET || 's$8LjAotW&Y75H7Mvabo6GfJPG@QmbkqkJLg&RJ21';
  const invalidRoleToken = require('jsonwebtoken').sign(payload, secret, { expiresIn: '1h' });

  await request(app.getHttpServer())
    .get('/rules/global')
    .set('Authorization', `Bearer ${invalidRoleToken}`)
    .expect(200);
});


  afterAll(async () => {
    await app.close();
  });
});
