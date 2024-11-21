import { RidesFactory } from '../factory/rides.factory';
import { Driver, Customer } from '@prisma/client';

export const ridersSeed = async (
  amountRegisters: number,
  drivers: Driver[],
  customers: Customer[],
) => {
  return new RidesFactory().createMany(amountRegisters, drivers, customers);
};
