import { Coordinate } from '@/protocols/coordinate.type';
import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';
import { Driver } from '@prisma/client';

export class EstimateResponseDto {
  origin: Coordinate;
  destination: Coordinate;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: GoogleRouteResponse;
}
