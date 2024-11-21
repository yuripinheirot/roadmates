import { Factory } from './factory';
import { faker } from '@faker-js/faker';
import { defineRideFactory } from './generated/fabbrica';
import { DriversFactory } from './drivers.factory';

export class RidesFactory extends Factory {
  async createMany(amountRegisters: number) {
    const list = Array.from({ length: amountRegisters }, () => ({
      value: BigInt(faker.number.int({ min: 1000, max: 10000 })),
      customer: {
        create: {
          name: faker.person.fullName(),
        },
      },
      driver: {
        create: DriversFactory.build(1)[0],
      },
      origin: faker.location.state(),
      destination: faker.location.state(),
      distance: faker.number.int({ min: 1, max: 1000 }),
      duration: `${faker.number.int({ min: 1, max: 100000 })}s`,
      date: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    }));

    await defineRideFactory({
      defaultData: {
        customer: {
          create: {
            name: faker.person.fullName(),
          },
        },
        driver: {
          create: DriversFactory.build(1)[0],
        },
      },
    }).createList(list);
  }
}
