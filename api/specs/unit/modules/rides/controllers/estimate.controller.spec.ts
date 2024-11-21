import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';
import { configurePipes } from '@specs/support/configure-pipes';
import { driversMock } from '@specs/mocks/drivers.mock';
import { PrismaService } from '@/services/prisma.service';

describe('[UNIT] [rides/estimate.controller] - [estimate()]', () => {
  let app: INestApplication;
  const sut = '/rides/estimate';

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule()
      .overrideProvider(PrismaService)
      .useValue({
        driver: {
          findMany: jest.fn().mockResolvedValue(driversMock),
        },
      })
      .compile();
    app = configurePipes(module.createNestApplication());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    app = undefined;
  });

  describe('handle()', () => {
    describe('validations', () => {
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
            'customerId must be a string',
            'customerId should not be empty',
          ],
          statusCode: 400,
        });
      });

      test('should return error if destination is same as origin', async () => {
        const response = await request(app.getHttpServer()).post(sut).send({
          origin: 'A',
          destination: 'A',
          customerId: '1',
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error_code: 'INVALID_DATA',
          error_description: 'Origin and destination cannot be the same',
        });
      });
    });
  });
});
