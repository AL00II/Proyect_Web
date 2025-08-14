import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Usuario',
        last_name: 'Prueba',
        email: process.env.TEST_USER,
        password: process.env.TEST_PWD,
        role: 'supervisor', 
        active: true
      })
      .then(() => {
      })
      .catch(() => {});

    const loginResponse = await request(app.getHttpServer())
  .post('/auth/login')
  .send({
    email: process.env.TEST_USER,
    password: process.env.TEST_PWD,
  })
  .expect(res => {
    if (![200, 201].includes(res.status)) {
      throw new Error(`Status inesperado: ${res.status}`);
    }
  });


    const token = loginResponse.body.access_token;

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Hello World!');
  });
});
