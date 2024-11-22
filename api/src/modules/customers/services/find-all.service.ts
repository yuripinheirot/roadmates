import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class FindAllService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async handle() {
    return this.customerRepository.findAll();
  }
}
