import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { EstimateService } from '@/modules/rides/services/estimate.service';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { GoogleRoute } from '@/providers/google-api/protocols/google-route-response.type';
import { TestingModule } from '@nestjs/testing';
import { driversMock } from '@specs/mocks/drivers.mock';
import { googleApiRouteResponseMock } from '@specs/mocks/google-api-route-response.mock';
import { buildTestingModule } from '@specs/support/specs.module';

const shorterRouteMock: GoogleRoute = {
  distanceMeters: 100,
  duration: '165s',
  legs: [
    {
      startLocation: {
        latLng: {
          latitude: 0,
          longitude: 0,
        },
      },
      endLocation: {
        latLng: {
          latitude: 1,
          longitude: 1,
        },
      },
    },
  ],
};

describe('[UNIT] [rides/estimate.service] - [handle()]', () => {
  let sut: EstimateService;
  let googleApiService: GoogleApiService;
  let rideRepository: RideRepositoryService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<EstimateService>(EstimateService);

    googleApiService = module.get<GoogleApiService>(GoogleApiService);
    rideRepository = module.get<RideRepositoryService>(RideRepositoryService);

    jest
      .spyOn(rideRepository, 'getRidersByMinDistance')
      .mockResolvedValue(driversMock);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('takeShorterRoute()', () => {
    describe('validations', () => {
      test('should return the shorter route', () => {
        const shorterRoute = sut.takeShorterRoute(googleApiRouteResponseMock);

        expect(shorterRoute).toEqual(shorterRouteMock);
      });
    });
  });

  describe('handle()', () => {
    describe('validations', () => {
      test('should call googleApiService.calculateRoute()', async () => {
        const googleApiServiceSpy = jest.spyOn(
          googleApiService,
          'calculateRoute',
        );

        jest
          .spyOn(googleApiService, 'calculateRoute')
          .mockResolvedValue(googleApiRouteResponseMock);

        await sut.handle({ origin: 'A', destination: 'B', customerId: '1' });

        expect(googleApiServiceSpy).toHaveBeenCalledWith({
          origin: 'A',
          destination: 'B',
        });
      });

      test('should call rideRepository.getRidersByMinDistance()', async () => {
        await sut.handle({ origin: 'A', destination: 'B', customerId: '1' });

        expect(rideRepository.getRidersByMinDistance).toHaveBeenCalledWith(
          shorterRouteMock.distanceMeters,
        );
      });
    });

    describe('success', () => {
      test('should return the drivers', async () => {
        const drivers = await sut.handle({
          origin: 'A',
          destination: 'B',
          customerId: '1',
        });

        expect(drivers).toEqual({
          origin: shorterRouteMock.legs[0].startLocation.latLng,
          destination: shorterRouteMock.legs[0].endLocation.latLng,
          distance: shorterRouteMock.distanceMeters,
          duration: shorterRouteMock.duration,
          options: driversMock,
          routeResponse: googleApiRouteResponseMock,
        });
      });
    });
  });
});