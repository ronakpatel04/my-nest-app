import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PermissionModule } from './permission.module';
import { PrismaService } from '../prisma/prisma.service';

describe('PermissionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PermissionModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/permissions (GET) - should fetch all permissions', async () => {
    return request(app.getHttpServer())
      .get('/permissions')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/permissions (POST) - should create a new permission', async () => {
    return request(app.getHttpServer())
      .post('/permissions')
      .send({ name: 'Write' })
      .expect(201);
  });

  it('/permissions/:id (PATCH) - should update a permission', async () => {
    return request(app.getHttpServer())
      .patch('/permissions/1')
      .send({ name: 'Execute' })
      .expect(200);
  });

  it('/permissions/:id (DELETE) - should delete a permission', async () => {
    return request(app.getHttpServer())
      .delete('/permissions/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
