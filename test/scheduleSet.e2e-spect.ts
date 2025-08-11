import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Acceder de un Schedule-set', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //login test para tener access token
  it('/auth/login (POST)', () => {
    const userTest = {
      email: process.env.TEST_USER,
      password: process.env.TEST_PWD,
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(userTest)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        //validar la respuesta esperada
        expect(body.user).toBeDefined();
        //el email del usuario autenticado debe ser
        expect(body.user.email).toEqual(userTest.email);
        expect(body.user.access_token).toBeDefined();
        //access token
        expect(body.access_token).toBeDefined;
      });

    // //crear un schedule set con access token
    // it('/GET schedule-set/detail', () => {
    //   return request(app.get)
    // });
  });
});
