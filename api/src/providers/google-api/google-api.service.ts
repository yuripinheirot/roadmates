import { Injectable } from '@nestjs/common';
import { CalculateRouteDto } from './dto/calculate-route.dto';
import { GoogleRouteResponse } from './protocols/google-route-response.type';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleApiService {
  private GOOGLE_API_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.GOOGLE_API_KEY = this.configService.getOrThrow('GOOGLE_API_KEY');
  }

  // TODO: implementar cache
  async calculateRoute(dto: CalculateRouteDto): Promise<GoogleRouteResponse> {
    const { origin, destination } = dto;

    const response = await this.httpService.axiosRef.post(
      `https://routes.googleapis.com/directions/v2:computeRoutes?key=${this.GOOGLE_API_KEY}`,
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
      },
      {
        headers: {
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
        },
      },
    );

    return response.data;
  }
}
