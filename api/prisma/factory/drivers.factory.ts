import { Factory } from './factory';
import { defineDriverFactory } from './generated/fabbrica';
import { faker } from '@faker-js/faker';

export class DriversFactory extends Factory {
  async createMany(amountRegisters: number) {
    const list = Array.from({ length: amountRegisters }, () => ({
      value: BigInt(faker.number.int({ min: 1000, max: 10000 })),
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
      vehicle: faker.vehicle.vehicle(),
      review: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
      },
      minDistance: faker.number.int({ min: 1, max: 1000 }),
    }));

    await defineDriverFactory().createList(list);
  }
}
