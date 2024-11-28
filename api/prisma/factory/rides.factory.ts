import { Factory } from './factory';
import { faker } from '@faker-js/faker';
import { defineRideFactory } from './generated/fabbrica';
import { DriversFactory } from './drivers.factory';
import { Customer, Driver, Prisma } from '@prisma/client';

export class RidesFactory extends Factory {
  async createMany(
    amountRegisters: number,
    drivers: Driver[],
    customers: Customer[],
  ) {
    const list: Partial<Prisma.RideCreateInput>[] = Array.from(
      { length: amountRegisters },
      () => ({
        value: faker.number.int({ min: 1000, max: 1000_00 }),
        customer: {
          connect: {
            id: customers[
              faker.number.int({ min: 0, max: customers.length - 1 })
            ].id,
          },
        },
        driver: {
          connect: {
            id: drivers[faker.number.int({ min: 0, max: drivers.length - 1 })]
              .id,
          },
        },
        origin: faker.location.state(),
        destination: faker.location.state(),
        distance: faker.number.int({ min: 1000, max: 1000_000 }),
        duration: `${faker.number.int({ min: 1, max: 100000 })}s`,
        date: faker.date.between({
          from: new Date('2020-01-01'),
          to: new Date(),
        }),
      }),
    );

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
