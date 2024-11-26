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

  async validateDriver(body: ConfirmRequestDto): Promise<void> {
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

  async validateCustomer(customerId: string): Promise<void> {
    const customer = await this.rideRepository.findCustomerById(customerId);

    if (!customer) {
      throw new NotFoundException(
        formatResponseError({
          code: CodeErrorsEnum.CUSTOMER_NOT_FOUND,
          message: 'Customer not found',
        }),
      );
    }
  }

  async validations(body: ConfirmRequestDto): Promise<void> {
    await this.validateDriver(body);
    await this.validateCustomer(body.customer_id);
  }

  calculateRideValue(body: ConfirmRequestDto): number {
    return body.distance * body.value;
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
      distance: body.distance,
      value: this.calculateRideValue(body),
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
