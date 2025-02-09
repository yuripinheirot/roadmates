import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { ListParamsRequestDto } from '../dtos/list-params.request.dto';
import { ListQueryRequestDto } from '../dtos/list-query.request.dto';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { formatResponseError } from '@/utils/format-response-error.util';

@Injectable()
export class ListService {
  constructor(private readonly rideRepository: RideRepositoryService) {}

  async validateCustomer(dto: ListParamsRequestDto & ListQueryRequestDto) {
    const customer = await this.rideRepository.findCustomerById(
      dto.customer_id,
    );

    if (!customer) {
      throw new NotFoundException(
        formatResponseError({
          code: CodeErrorsEnum.CUSTOMER_NOT_FOUND,
          message: 'Customer not found',
        }),
      );
    }
  }

  async validateDriver(dto: ListParamsRequestDto & ListQueryRequestDto) {
    const driver = await this.rideRepository.findDriverById(dto.driver_id);

    if (!driver) {
      throw new BadRequestException(
        formatResponseError({
          code: CodeErrorsEnum.INVALID_DRIVER,
          message: 'Invalid driver',
        }),
      );
    }
  }

  async executeValidations(dto: ListParamsRequestDto & ListQueryRequestDto) {
    await this.validateCustomer(dto);

    if (dto.driver_id) {
      await this.validateDriver(dto);
    }
  }

  async handle(dto: ListParamsRequestDto & ListQueryRequestDto) {
    await this.executeValidations(dto);

    const rides = await this.rideRepository.listRides(dto);

    if (rides.length === 0) {
      throw new NotFoundException(
        formatResponseError({
          code: CodeErrorsEnum.NO_RIDES_FOUND,
          message: 'Rides not found',
        }),
      );
    }

    return {
      customer_id: dto.customer_id,
      rides,
    };
  }
}
