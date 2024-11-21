import { Injectable } from '@nestjs/common';
import { RideRepositoryService } from '../repository/ride-repository.service';
import { ListParamsRequestDto } from '../dtos/list-params.request.dto';
import { ListQueryRequestDto } from '../dtos/list-query.request.dto';

@Injectable()
export class ListService {
  constructor(private readonly rideRepository: RideRepositoryService) {}

  async handle(dto: ListParamsRequestDto & ListQueryRequestDto) {
    const rides = await this.rideRepository.listRides(dto);

    return {
      customer_id: dto.customer_id,
      rides,
    };
  }
}
