import { Injectable } from '@nestjs/common';
import { CalculateRouteDto } from './dto/calculate-route.dto';

@Injectable()
export class GoogleApiService {
  async calculateRoute(dto: CalculateRouteDto) {
    return Promise.resolve(dto);
  }
}
