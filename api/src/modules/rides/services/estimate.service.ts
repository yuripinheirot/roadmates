import { Injectable } from '@nestjs/common';
import { EstimateRequestDto } from '../dtos/estimate.request.dto';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';
import { GoogleRoute } from '@/providers/google-api/protocols/google-route-response.type';

@Injectable()
export class EstimateService {
  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly rideRepository: RideRepositoryService,
  ) {}

  takeShorterRoute(routes: GoogleRouteResponse): GoogleRoute {
    return routes.routes.sort((a, b) => a.distanceMeters - b.distanceMeters)[0];
  }

  async handle(body: EstimateRequestDto) {
    const calculatedRoute = await this.googleApiService.calculateRoute({
      origin: body.origin,
      destination: body.destination,
    });

    const shorterRoute = this.takeShorterRoute(calculatedRoute);

    const drivers = await this.rideRepository.getRidersByMinDistance(
      shorterRoute.distanceMeters,
    );

    return drivers;
  }
}
