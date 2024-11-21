import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { Injectable } from '@nestjs/common';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { ConfirmRequestDto } from '../dtos/confirm.request.dto';

@Injectable()
export class ConfirmService {
  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly rideRepository: RideRepositoryService,
  ) {}

  async handle(body: ConfirmRequestDto): Promise<any> {
    return {
      message: 'Ride confirmed successfully',
      ride: body,
    } as any;
  }
}
