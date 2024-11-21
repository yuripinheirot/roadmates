import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { ListService } from '@/modules/rides/services/list.service';
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
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handle()', () => {
    describe('validations', () => {
      test('should pass correct params to repository', async () => {
        jest.spyOn(rideRepository, 'listRides').mockResolvedValue(ridesMock);

        await sut.handle({
          customer_id: customerMock[0].id,
          driver_id: driversMock[0].id,
        });

        expect(rideRepository.listRides).toHaveBeenCalledWith({
          customer_id: customerMock[0].id,
          driver_id: driversMock[0].id,
        });
      });

      test('should not pass driver_id if not provided', async () => {
        jest.spyOn(rideRepository, 'listRides').mockResolvedValue(ridesMock);

        await sut.handle({ customer_id: customerMock[0].id });

        expect(rideRepository.listRides).toHaveBeenCalledWith({
          customer_id: customerMock[0].id,
        });
      });
    });
    describe('success', () => {
      test('should return success response', async () => {
        jest.spyOn(rideRepository, 'listRides').mockResolvedValue(ridesMock);

        const result = await sut.handle({
          customer_id: customerMock[0].id,
        });

        expect(result).toEqual(ridesMock);
      });
    });
  });
});
