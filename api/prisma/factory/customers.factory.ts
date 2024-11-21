import { Factory } from './factory';
import { defineCustomerFactory } from './generated/fabbrica';
import { faker } from '@faker-js/faker';

export class CustomersFactory extends Factory {
  async createMany(amountRegisters: number) {
    const list = Array.from({ length: amountRegisters }, () => ({
      name: faker.person.fullName(),
    }));

    await defineCustomerFactory().createList(list);
  }
}
