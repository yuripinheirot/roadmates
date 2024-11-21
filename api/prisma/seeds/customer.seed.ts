import { CustomersFactory } from '../factory/customers.factory';

export const customerSeed = async (amountRegisters: number) => {
  const factory = new CustomersFactory();
  await factory.createMany(amountRegisters);
};
