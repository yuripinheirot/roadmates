import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../repository/driver.repository';

@Injectable()
export class FindAllService {
  constructor(private readonly customerRepository: DriverRepository) {}

  async handle() {
    return this.customerRepository.findAll();
  }
}
