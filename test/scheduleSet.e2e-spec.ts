import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);
describe('Acceder al perfil del usuario', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login para obtener token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login') // corregido con slash inicial
      .send({
        email: process.env.TEST_USER,
        password: process.env.TEST_PWD,
      })
      //postman devulve 201 para creado
      // .expect(201);
      .expect(200);

    expect(loginRes.body.access_token).toBeDefined();
    accessToken = loginRes.body.access_token;
  });

  it('Debe registrar un Schedule-set', async () => {
    const newSchedule = {
      name: 'Horario Vespertino',
      description: 'Horario de lunes a viernes',
      is_active: true,
    };

    const res = await request(app.getHttpServer())
      .post('/schedule-sets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newSchedule)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newSchedule.name);
  });

  afterAll(async () => {
    await app.close();
  });
});
