import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateRideService {
  handle({ distance, value }: { distance: number; value: number }): number {
    const distanceInKm = distance / 1000;
    const rawResult = distanceInKm * value;
    const result = Math.round(rawResult);

    return result;
  }
}
