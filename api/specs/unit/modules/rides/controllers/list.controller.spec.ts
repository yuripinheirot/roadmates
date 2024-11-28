import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';
import { configurePipes } from '@specs/support/configure-pipes';
import { driversMock } from '@specs/mocks/drivers.mock';
import { PrismaService } from '@/services/prisma.service';
import { randomUUID } from 'crypto';

describe('[UNIT] [rides/list.controller] - [list()]', () => {
  let app: INestApplication;
  const makeSut = (
    params: { customer_id: string; driver_id?: string } = {
      customer_id: randomUUID(),
    },
  ) => {
    const { customer_id, driver_id } = params;

    return `/rides/${customer_id} ${
      driver_id ? `?driver_id=${driver_id}` : ''
    }`;
  };

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
        const invalidSut = makeSut({ customer_id: '1' });
        const response = await request(app.getHttpServer()).get(invalidSut);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error_code: 'INVALID_DATA',
          error_description: 'customer_id must be a UUID',
        });
      });

      test('should validate all optional params', async () => {
        const invalidSut = makeSut({
          customer_id: randomUUID(),
          driver_id: randomUUID(),
        });
        const response = await request(app.getHttpServer()).get(invalidSut);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error_code: 'INVALID_DATA',
          error_description:
            'driver_id must be a number conforming to the specified constraints',
        });
      });
    });
  });
});
