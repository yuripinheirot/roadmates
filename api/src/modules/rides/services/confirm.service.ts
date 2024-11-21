import { GoogleApiService } from '@/providers/google-api/google-api.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { ConfirmRequestDto } from '../dtos/confirm.request.dto';
import { formatResponseError } from '@/utils/format-response-error.util';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';

@Injectable()
export class ConfirmService {
  constructor(
    private readonly googleApiService: GoogleApiService,
    private readonly rideRepository: RideRepositoryService,
  ) {}

  async validations(body: ConfirmRequestDto): Promise<void> {
    const driver = await this.rideRepository.findDriverById(body.driver.id);

    if (!driver) {
      throw new NotFoundException(
        formatResponseError({
          code: CodeErrorsEnum.DRIVER_NOT_FOUND,
          message: 'Driver not found',
        }),
      );
    }

    if (driver.minDistance > body.distance) {
      throw new BadRequestException(
        formatResponseError({
          code: CodeErrorsEnum.INVALID_DATA,
          message: 'Driver does not have the minimum distance',
        }),
      );
    }
  }

  async handle(body: ConfirmRequestDto): Promise<any> {
    await this.validations(body);

    return {
      message: 'Ride confirmed successfully',
      ride: body,
    } as any;
  }
}
