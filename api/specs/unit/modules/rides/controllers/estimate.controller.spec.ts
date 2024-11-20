import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';
import { configurePipes } from '@specs/support/configure-pipes';

describe('[UNIT] [rides/estimate.controller] - [estimate()]', () => {
  let app: INestApplication;
  const sut = '/rides/estimate';

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();
    app = configurePipes(module.createNestApplication());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    app = undefined;
  });

  describe('estimate()', () => {
    test('should validate all required params', async () => {
      const response = await request(app.getHttpServer()).post(sut);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: [
          'origin must be a string',
          'origin should not be empty',
          'destination must be a string',
          'destination should not be empty',
          'customer_id must be a string',
          'customer_id should not be empty',
        ],
        statusCode: 400,
      });
    });
  });
});
