import { RidesFactory } from '../factory/rides.factory';

export const ridersSeed = async (amountRegisters: number) => {
  await new RidesFactory().createMany(amountRegisters);
};
