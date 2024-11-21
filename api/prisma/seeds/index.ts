import { customerSeed } from './customer.seed';
import { driverSeed } from './drivers.seed';

const main = async () => {
  const totalRegisters = 100;
  await customerSeed(totalRegisters);
  await driverSeed(totalRegisters);
};

main();
