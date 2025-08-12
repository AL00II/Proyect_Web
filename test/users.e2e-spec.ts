import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('E2E - Users Module', () => {
  let app: INestApplication<App>;

    jest.setTimeout(15000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('POST /auth/register - debe registrar un nuevo usuario', async () => {
  const user = {
    name: 'Alo Test',
    last_name: 'Juárez',
    email: process.env.TEST_USER,
    password: process.env.TEST_PWD,
    role: 'admin'
  };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201); 
      
        expect(res.body.access_token).toBeDefined();
        console.log(res.body);
    });



  it('POST /auth/login - debe autenticar al usuario', async () => {
    const userTest = {
      email: process.env.TEST_USER,
      password: process.env.TEST_PWD,
      
    };
    console.log('Usuario de test:', userTest);


    const res = await request(app.getHttpServer())
    
      .post('/auth/login')
      .send(userTest)
      .expect(200)
      .then(({body}) => {
        console.log(body);

        expect(body.access_token).toBeDefined();
        // conservar el token
        process.env.TOKEN = body.access_token;
        const decoded = JSON.parse(
          Buffer.from(body.access_token.split('.')[1], 'base64').toString()
        );
        process.env.USER_ID = decoded.sub;
    });  
  });

   it('GET /users - debe retornar todos los usuarios', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
    expect(Array.isArray(res.body)).toBe(true);
    console.log(res.body);
  });

  it('GET /users/me - debe retornar el perfil del usuario', async () => {
    const res = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);

    expect(res.body.email).toEqual(process.env.TEST_USER);
    console.log(res.body);
  });

  it('GET /users/:id - debe retornar un usuario específico', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${process.env.USER_ID}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);

    expect(res.body.id).toEqual(process.env.USER_ID);
    console.log(res.body);
  });

  it('PATCH /users/:id - debe actualizar un usuario', async () => {
    const updateData = { name: 'Cambio nombre' };

    const res = await request(app.getHttpServer())
      .patch(`/users/${process.env.USER_ID}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(updateData)
      .expect(200);

    expect(res.body.name).toEqual('Cambio nombre');
    console.log(res.body);
    
  });

  it('DELETE /users/:id - debe eliminar un usuario', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/users/${process.env.USER_ID}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    console.log(res.body);
  });



});
