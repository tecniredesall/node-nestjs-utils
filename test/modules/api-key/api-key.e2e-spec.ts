require('dotenv').config();
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiKeyModule } from '../../../src';
import { ApiKeyAuthProvider } from '../../../src/modules/api-key/api-key.constants';
import { ApiKeyExampleController } from './api-key.controller.example';

const token = process.env.API_KEY_E2E_TOKEN;
const authProvider =
  process.env.API_KEY_E2E_AUTH_PROVIDER || ApiKeyAuthProvider.DEVELOPMENT;
if (!token)
  throw new Error('API_KEY_E2E_TOKEN environment variable is required');

describe(ApiKeyModule.name, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ApiKeyModule.register({
          authProvider,
        }),
      ],
      controllers: [ApiKeyExampleController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('makes an authorized call', () => {
    return request(app.getHttpServer())
      .get('/api-key')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(200);
  });
});
