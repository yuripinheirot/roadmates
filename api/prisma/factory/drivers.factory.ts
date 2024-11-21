import { Factory } from './factory';
import { defineDriverFactory } from './generated/fabbrica';
import { faker } from '@faker-js/faker';

export class DriversFactory extends Factory {
  static build(amountRegisters: number) {
    const list = Array.from({ length: amountRegisters }, () => ({
      value: faker.number.int({ min: 1000, max: 10000 }),
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
      vehicle: faker.vehicle.vehicle(),
      review: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
      },
      minDistance: faker.number.int({ min: 1, max: 1000 }),
    }));

    return list;
  }

  async createMany(amountRegisters: number) {
    return defineDriverFactory().createList(
      DriversFactory.build(amountRegisters),
    );
  }
}
