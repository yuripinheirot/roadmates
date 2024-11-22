import { Injectable, NotFoundException } from '@nestjs/common';
import { EstimateRequestDto } from '../dtos/estimate.request.dto';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';
import { GoogleRoute } from '@/providers/google-api/protocols/google-route-response.type';
import { EstimateResponseDto } from '../dtos/estimate.response.dto';
import { formatResponseError } from '@/utils/format-response-error.util';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';

@Injectable()
export class EstimateService {
  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly rideRepository: RideRepositoryService,
  ) {}

  async validateCustomer(customer_id: string) {
    const customer = await this.rideRepository.findCustomerById(customer_id);

    if (!customer) {
      throw new NotFoundException(
        formatResponseError({
          code: CodeErrorsEnum.CUSTOMER_NOT_FOUND,
          message: 'Customer not found',
        }),
      );
    }
  }

  takeShorterRoute(routes: GoogleRouteResponse): GoogleRoute {
    return routes.routes.sort((a, b) => a.distanceMeters - b.distanceMeters)[0];
  }

  async handle(body: EstimateRequestDto): Promise<EstimateResponseDto> {
    const { origin, destination, customer_id } = body;

    await this.validateCustomer(customer_id);

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
