import { Ride } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { driversMock } from './drivers.mock';
import { customerMock } from './customer.mock';

export const ridesMock: Ride[] = [
  {
    id: '094ee09c-ffc8-4783-bc49-0cc147f178a7',
    origin: 'Origin 1',
    destination: 'Destination 1',
    distance: 100,
    duration: '1 hour',
    value: new Decimal(10),
    date: new Date('2024-01-01'),
    customer_id: customerMock[0].id,
    driver_id: driversMock[0].id,
  },
  {
    id: '5a40e5bf-22de-4bc2-a067-232f447320a9',
    origin: 'Origin 2',
    destination: 'Destination 2',
    distance: 200,
    duration: '1 hour',
    value: new Decimal(150),
    date: new Date('2024-01-02'),
    customer_id: customerMock[1].id,
    driver_id: driversMock[1].id,
  },
  {
    id: '4abde418-841b-48e5-852e-dd051d6a8163',
    origin: 'Origin 3',
    destination: 'Destination 3',
    distance: 500,
    duration: '1 hour',
    value: new Decimal(300),
    date: new Date('2024-01-03'),
    customer_id: customerMock[2].id,
    driver_id: driversMock[2].id,
  },
];
