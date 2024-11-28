import { Driver } from '@prisma/client';

export const driversMock: Driver[] = [
  {
    id: 1,
    name: 'Homer Simpson',
    description: 'Homer Simpson description',
    vehicle: 'Homer Simpson vehicle',
    review: {
      rating: 5,
      comment: 'Homer Simpson comment',
    },
    value: 50,
    minDistance: 100,
  },
  {
    id: 2,
    name: 'Dominic Toretto',
    description: 'Dominic Toretto description',
    vehicle: 'Dominic Toretto vehicle',
    review: {
      rating: 2.5,
      comment: 'Dominic Toretto comment',
    },
    value: 100,
    minDistance: 300,
  },
  {
    id: 3,
    name: 'James Bond',
    description: 'James Bond description',
    vehicle: 'James Bond vehicle',
    review: {
      rating: 4.5,
      comment: 'James Bond comment',
    },
    value: 300,
    minDistance: 500,
  },
];
