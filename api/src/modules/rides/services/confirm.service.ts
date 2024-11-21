import { GoogleApiService } from '@/providers/google-api/google-api.service';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { ConfirmRequestDto } from '../dtos/confirm.request.dto';
import { formatResponseError } from '@/utils/format-response-error.util';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConfirmService {
  constructor(private readonly rideRepository: RideRepositoryService) {}

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
      throw new NotAcceptableException(
        formatResponseError({
          code: CodeErrorsEnum.INVALID_DISTANCE,
          message: 'Driver does not have the minimum distance',
        }),
      );
    }
  }

  formatRidePayload(body: ConfirmRequestDto): Prisma.RideCreateInput {
    const { customer_id, driver, ...rest } = body;
    return {
      ...rest,
      date: new Date(),
      customer: {
        connect: {
          id: customer_id,
        },
      },
      driver: {
        connect: {
          id: driver.id,
        },
      },
    };
  }

  async handle(body: ConfirmRequestDto) {
    await this.validations(body);
    await this.rideRepository.createRide(this.formatRidePayload(body));

    return {
      success: true,
    };
  }
}
