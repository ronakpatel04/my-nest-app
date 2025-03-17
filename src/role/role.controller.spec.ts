import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RoleModule } from './role.module';
import { PrismaService } from '../prisma/prisma.service';

describe('RoleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RoleModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/roles (GET) - should fetch all roles', async () => {
    return request(app.getHttpServer())
      .get('/roles')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/roles (POST) - should create a new role', async () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({ name: 'User' })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe('User');
      });
  });

  it('/roles/:id (PATCH) - should update a role', async () => {
    return request(app.getHttpServer())
      .patch('/roles/1')
      .send({ name: 'Super Admin' })
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe('Super Admin');
      });
  });

  it('/roles/:id (DELETE) - should delete a role', async () => {
    return request(app.getHttpServer())
      .delete('/roles/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
