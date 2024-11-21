import { PrismaService } from '@/services/prisma.service';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { driversMock } from '@specs/mocks/drivers.mock';
import { configurePipes } from '@specs/support/configure-pipes';
import { buildTestingModule } from '@specs/support/specs.module';
import * as request from 'supertest';

describe('[UNIT] [rides/confirm.controller] - [handle()]', () => {
  let app: INestApplication;
  const sut = '/rides/confirm';

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
        const response = await request(app.getHttpServer())
          .patch(sut)
          .send({ driver: {} });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: [
            'customer_id should not be empty',
            'customer_id must be a string',
            'origin should not be empty',
            'origin must be a string',
            'destination should not be empty',
            'destination must be a string',
            'distance should not be empty',
            'distance must be a number conforming to the specified constraints',
            'duration should not be empty',
            'duration must be a string',
            'driver.id must be a number conforming to the specified constraints',
            'driver.name must be a string',
            'value should not be empty',
            'value must be a number conforming to the specified constraints',
          ],
          statusCode: 400,
        });
      });
    });
  });
});
