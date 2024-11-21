import { customerSeed } from './customer.seed';
import { driverSeed } from './drivers.seed';
import { ridersSeed } from './riders.seed';

const main = async () => {
  const totalRegisters = 100;
  const drivers = await driverSeed(totalRegisters / 10);
  const customers = await customerSeed(totalRegisters / 10);

  await ridersSeed(totalRegisters, drivers, customers);
};

main();
