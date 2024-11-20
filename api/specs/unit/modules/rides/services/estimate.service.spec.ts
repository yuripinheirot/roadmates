import { RideRepositoryService } from '@/modules/rides/repository/ride-repository.service';
import { EstimateService } from '@/modules/rides/services/estimate.service';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { TestingModule } from '@nestjs/testing';
import { googleApiRouteResponseMock } from '@specs/mocks/google-api-route-response.mock';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [rides/estimate.service] - [handle()]', () => {
  let sut: EstimateService;
  let googleApiService: GoogleApiService;
  let rideRepository: RideRepositoryService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<EstimateService>(EstimateService);

    googleApiService = module.get<GoogleApiService>(GoogleApiService);
    rideRepository = module.get<RideRepositoryService>(RideRepositoryService);

    jest.spyOn(rideRepository, 'getRidersByMinDistance').mockResolvedValue([]);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('takeShorterRoute()', () => {
    describe('validations', () => {
      test('should return the shorter route', () => {
        const shorterRoute = sut.takeShorterRoute(googleApiRouteResponseMock);

        expect(shorterRoute).toEqual({
          distanceMeters: 100,
          duration: '165s',
          polyline: {
            encodedPolyline: 'ipkcFfichVnP@j@BLoFVwM{E?',
          },
        });
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
    });
  });
});
