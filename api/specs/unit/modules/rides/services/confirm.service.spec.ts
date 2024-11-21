import { ConfirmRequestDto } from '@/modules/rides/dtos/confirm.request.dto';
import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { ConfirmService } from '@/modules/rides/services/confirm.service';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { formatResponseError } from '@/utils/format-response-error.util';
import { TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { driversMock } from '@specs/mocks/drivers.mock';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [rides/confirm.service] - [handle()]', () => {
  let sut: ConfirmService;
  let rideRepository: RideRepositoryService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<ConfirmService>(ConfirmService);

    rideRepository = module.get<RideRepositoryService>(RideRepositoryService);

    jest
      .spyOn(rideRepository, 'getDriversByMinDistance')
      .mockResolvedValue(driversMock);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validPayload: ConfirmRequestDto = {
    customer_id: '1',
    driver: {
      id: '1',
      name: 'John Doe',
    },
    origin: 'origin',
    destination: 'destination',
    distance: 100,
    duration: '10s',
    value: 10,
  };

  const validDriver = driversMock[0];

  describe('handle()', () => {
    describe('validations', () => {
      test('should return an error if the driver is not found', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(null);

        const invalidDriverId = 'invalid-driver-id';

        const response = sut.handle({
          ...validPayload,
          driver: {
            id: invalidDriverId,
            name: 'John Doe',
          },
        });

        await expect(response).rejects.toMatchObject({
          response: formatResponseError({
            code: CodeErrorsEnum.DRIVER_NOT_FOUND,
            message: 'Driver not found',
          }),
          status: 404,
        });
      });

      test('should return an error if the driver does not have the minimum distance', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(validDriver);

        const response = sut.handle({
          ...validPayload,
          distance: 0,
        });

        await expect(response).rejects.toMatchObject({
          response: formatResponseError({
            code: CodeErrorsEnum.INVALID_DISTANCE,
            message: 'Driver does not have the minimum distance',
          }),
          status: 406,
        });
      });

      test('should call createRide with success', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(validDriver);

        const createRideSpy = jest
          .spyOn(rideRepository, 'createRide')
          .mockResolvedValueOnce(validPayload as any);

        await sut.handle(validPayload);

        const expectedCreateRidePayload: Prisma.RideCreateInput = {
          origin: validPayload.origin,
          destination: validPayload.destination,
          distance: validPayload.distance,
          duration: validPayload.duration,
          value: validPayload.value,
          date: new Date(),
          customer: {
            connect: {
              id: validPayload.customer_id,
            },
          },
          driver: {
            connect: {
              id: validPayload.driver.id,
            },
          },
        };

        expect(createRideSpy).toHaveBeenCalledWith(expectedCreateRidePayload);
      });
    });
    describe('success', () => {
      test('should return success response', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(validDriver);

        jest.spyOn(rideRepository, 'createRide').mockResolvedValueOnce(null);

        const response = await sut.handle(validPayload);

        expect(response).toEqual({ success: true });
      });
    });
  });
});
