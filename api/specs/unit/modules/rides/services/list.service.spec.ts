import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { ListService } from '@/modules/rides/services/list.service';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { formatResponseError } from '@/utils/format-response-error.util';
import { NotFoundException } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { customerMock } from '@specs/mocks/customer.mock';
import { driversMock } from '@specs/mocks/drivers.mock';
import { ridesMock } from '@specs/mocks/rides.mock';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [rides/list.service] - [handle()]', () => {
  let sut: ListService;
  let rideRepository: RideRepositoryService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<ListService>(ListService);

    rideRepository = module.get<RideRepositoryService>(RideRepositoryService);

    jest
      .spyOn(rideRepository, 'findCustomerById')
      .mockResolvedValue(customerMock[0]);

    jest
      .spyOn(rideRepository, 'findDriverById')
      .mockResolvedValue(driversMock[0]);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validPayload = {
    customer_id: customerMock[0].id,
    driver_id: driversMock[0].id,
  };

  describe('handle()', () => {
    describe('validations', () => {
      test('should pass correct params to repository', async () => {
        jest
          .spyOn(rideRepository, 'listRides')
          .mockResolvedValueOnce(ridesMock);

        await sut.handle(validPayload);

        expect(rideRepository.listRides).toHaveBeenCalledWith(validPayload);
      });

      test('should not pass driver_id if not provided', async () => {
        jest
          .spyOn(rideRepository, 'listRides')
          .mockResolvedValueOnce(ridesMock);

        await sut.handle({ customer_id: customerMock[0].id });

        expect(rideRepository.listRides).toHaveBeenCalledWith({
          customer_id: customerMock[0].id,
        });
      });

      test('should return an error if driver does not exist', async () => {
        jest
          .spyOn(rideRepository, 'findDriverById')
          .mockResolvedValueOnce(null);

        const response = sut.handle(validPayload);

        await expect(response).rejects.toThrow(
          new NotFoundException(
            formatResponseError({
              code: CodeErrorsEnum.DRIVER_NOT_FOUND,
              message: 'Driver not found',
            }),
          ),
        );
      });

      test('should return an error if customer does not exist', async () => {
        jest
          .spyOn(rideRepository, 'findCustomerById')
          .mockResolvedValueOnce(null);

        const response = sut.handle(validPayload);

        await expect(response).rejects.toThrow(
          new NotFoundException(
            formatResponseError({
              code: CodeErrorsEnum.CUSTOMER_NOT_FOUND,
              message: 'Customer not found',
            }),
          ),
        );
      });

      test('should return an error if rides not found', async () => {
        jest.spyOn(rideRepository, 'listRides').mockResolvedValueOnce([]);

        const response = sut.handle(validPayload);

        await expect(response).rejects.toThrow(
          new NotFoundException(
            formatResponseError({
              code: CodeErrorsEnum.NO_RIDES_FOUND,
              message: 'Rides not found',
            }),
          ),
        );
      });
    });
    describe('success', () => {
      test('should return success response', async () => {
        jest.spyOn(rideRepository, 'listRides').mockResolvedValue(ridesMock);

        const result = await sut.handle({
          customer_id: customerMock[0].id,
        });

        expect(result).toEqual({
          customer_id: customerMock[0].id,
          rides: ridesMock,
        });
      });
    });
  });
});
