import { ridersSeed } from './riders.seed';

const main = async () => {
  const totalRegisters = 100;
  await ridersSeed(totalRegisters);
};

main();
