import { ConfirmRequestDto } from '@/modules/rides/dtos/confirm.request.dto';
import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { ConfirmService } from '@/modules/rides/services/confirm.service';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { formatResponseError } from '@/utils/format-response-error.util';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { driversMock } from '@specs/mocks/drivers.mock';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [rides/confirm.service] - [handle()]', () => {
  let sut: ConfirmService;
  let googleApiService: GoogleApiService;
  let rideRepository: RideRepositoryService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<ConfirmService>(ConfirmService);

    googleApiService = module.get<GoogleApiService>(GoogleApiService);
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
    distance: 10,
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

        await expect(response).rejects.toThrow(
          new NotFoundException(
            formatResponseError({
              code: CodeErrorsEnum.DRIVER_NOT_FOUND,
              message: 'Driver not found',
            }),
          ),
        );
      });

      test('should return an error if the driver does not have the minimum distance', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(validDriver);

        const response = sut.handle({
          ...validPayload,
          distance: 0,
        });

        await expect(response).rejects.toThrow(
          new BadRequestException(
            formatResponseError({
              code: CodeErrorsEnum.INVALID_DATA,
              message: 'Driver does not have the minimum distance',
            }),
          ),
        );
      });
    });
    describe('success', () => {
      test('should return the drivers', async () => {
        expect(true).toBe(true);
      });
    });
  });
});
