import { Injectable } from '@nestjs/common';
import { EstimateRequestDto } from '../dtos/estimate.request.dto';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';
import { GoogleRoute } from '@/providers/google-api/protocols/google-route-response.type';
import { EstimateResponseDto } from '../dtos/estimate.response.dto';

@Injectable()
export class EstimateService {
  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly rideRepository: RideRepositoryService,
  ) {}

  takeShorterRoute(routes: GoogleRouteResponse): GoogleRoute {
    return routes.routes.sort((a, b) => a.distanceMeters - b.distanceMeters)[0];
  }

  async handle(body: EstimateRequestDto): Promise<EstimateResponseDto> {
    const { origin, destination } = body;

    const calculatedRoute = await this.googleApiService.calculateRoute({
      origin,
      destination,
    });

    const shorterRoute = this.takeShorterRoute(calculatedRoute);

    const drivers = await this.rideRepository.getDriversByMinDistance(
      shorterRoute.distanceMeters,
    );

    return {
      origin: shorterRoute.legs[0].startLocation.latLng,
      destination: shorterRoute.legs[0].endLocation.latLng,
      distance: shorterRoute.distanceMeters,
      duration: shorterRoute.duration,
      options: drivers,
      routeResponse: calculatedRoute,
    };
  }
}
