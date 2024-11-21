import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { PrismaService } from '@/services/prisma.service';
import { TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [rides/repository/ride-repository.service]', () => {
  let sut: RideRepositoryService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<RideRepositoryService>(RideRepositoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDriversByMinDistance()', () => {
    describe('validations', () => {
      test('should receive correct params', async () => {
        jest.spyOn(prismaService.driver, 'findMany').mockResolvedValue([]);

        await sut.getDriversByMinDistance(10);

        expect(prismaService.driver.findMany).toHaveBeenCalledWith({
          where: {
            minDistance: {
              lte: 10,
            },
          },
        });
      });
    });
  });

  describe('findDriverById()', () => {
    describe('validations', () => {
      test('should receive correct params', async () => {
        jest.spyOn(prismaService.driver, 'findUnique').mockResolvedValue(null);

        await sut.findDriverById('1');

        expect(prismaService.driver.findUnique).toHaveBeenCalledWith({
          where: {
            id: '1',
          },
        });
      });
    });
  });

  describe('listRides()', () => {
    describe('validations', () => {
      test('should receive correct params', async () => {
        jest.spyOn(prismaService.ride, 'findMany').mockResolvedValue([]);

        await sut.listRides({
          customer_id: '1',
          driver_id: '1',
        });

        expect(prismaService.ride.findMany).toHaveBeenCalledWith({
          where: {
            customer_id: '1',
            driver_id: '1',
          },
          orderBy: {
            date: 'desc',
          },
        });
      });

      test('should not pass driver_id if not provided', async () => {
        jest.spyOn(prismaService.ride, 'findMany').mockResolvedValue([]);

        await sut.listRides({
          customer_id: '1',
        });
      });
    });
  });

  describe('createRide()', () => {
    describe('validations', () => {
      test('should receive correct params', async () => {
        jest.spyOn(prismaService.ride, 'create').mockResolvedValue(null);

        const validPayload: Prisma.RideCreateInput = {
          origin: '1',
          destination: '2',
          distance: 10,
          duration: '10',
          value: 10,
          date: new Date(),
          customer: {
            connect: {
              id: '1',
            },
          },
          driver: {
            connect: {
              id: '1',
            },
          },
        };

        await sut.createRide(validPayload);

        expect(prismaService.ride.create).toHaveBeenCalledWith({
          data: validPayload,
        });
      });
    });
  });
});
