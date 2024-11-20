import { Injectable } from '@nestjs/common';
import { CalculateRouteDto } from './dto/calculate-route.dto';
import { GoogleRouteResponse } from './protocols/google-route-response.type';

@Injectable()
export class GoogleApiService {
  async calculateRoute(dto: CalculateRouteDto): Promise<GoogleRouteResponse> {
    return Promise.resolve(dto) as any;
  }
}
