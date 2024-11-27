import { Factory } from './factory';
import { defineDriverFactory } from './generated/fabbrica';
import { faker } from '@faker-js/faker';

export class DriversFactory extends Factory {
  static build(amountRegisters: number) {
    const validDistances = [
      1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
    ];

    const list = Array.from({ length: amountRegisters }, () => ({
      value: faker.number.int({ min: 1, max: 1000 }),
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
      vehicle: faker.vehicle.vehicle(),
      review: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
      },
      minDistance:
        validDistances[
          faker.number.int({ min: 0, max: validDistances.length - 1 })
        ],
    }));

    return list;
  }

  async createMany(amountRegisters: number) {
    return defineDriverFactory().createList(
      DriversFactory.build(amountRegisters),
    );
  }
}
