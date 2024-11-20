import { Driver } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

export const driversMock: Driver[] = [
  {
    id: randomUUID(),
    name: 'Homer Simpson',
    description: 'Homer Simpson description',
    vehicle: 'Homer Simpson vehicle',
    review: {
      rating: 5,
      comment: 'Homer Simpson comment',
    },
    value: new Decimal(5),
    minDistance: 100,
  },
  {
    id: randomUUID(),
    name: 'Dominic Toretto',
    description: 'Dominic Toretto description',
    vehicle: 'Dominic Toretto vehicle',
    review: {
      rating: 2.5,
      comment: 'Dominic Toretto comment',
    },
    value: new Decimal(10),
    minDistance: 300,
  },
  {
    id: randomUUID(),
    name: 'James Bond',
    description: 'James Bond description',
    vehicle: 'James Bond vehicle',
    review: {
      rating: 4.5,
      comment: 'James Bond comment',
    },
    value: new Decimal(30),
    minDistance: 500,
  },
];
