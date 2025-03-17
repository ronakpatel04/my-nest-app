import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) - should create a user', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: '123456', roleName: 'user' })
      .expect(201);
  });

  it('/auth/signin (POST) - should return JWT token', async () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'test@example.com', password: '123456' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
