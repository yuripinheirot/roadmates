import { Coordinate } from '@/protocols/coordinate.type';
import { GoogleRouteResponse } from '@/providers/google-api/protocols/google-route-response.type';

export type OptionsResponseDto = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
  pricePerKm: number;
};

export class EstimateResponseDto {
  origin: Coordinate;
  destination: Coordinate;
  distance: number;
  duration: string;
  options: OptionsResponseDto[];
  routeResponse: GoogleRouteResponse;
}
