import { PrismaClient } from '@prisma/client';
import { initialize } from './generated/fabbrica';

export class Factory {
  protected client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
    initialize({ prisma: this.client });
  }
}
