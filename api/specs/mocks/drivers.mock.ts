import { Driver } from '@prisma/client';

export const driversMock: Driver[] = [
  {
    id: '60d9d2df-f713-426d-b7e6-30d058ab5202',
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
    id: '4d936e42-8a1d-40b9-9ca3-233afb97eb99',
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
    id: 'd3f96fc0-ca60-435a-88d6-1bcd0f88549a',
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
