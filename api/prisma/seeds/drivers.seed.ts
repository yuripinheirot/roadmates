import { DriversFactory } from '../factory/drivers.factory';

export const driverSeed = async (amountRegisters: number) => {
  const factory = new DriversFactory();
  return factory.createMany(amountRegisters);
};
