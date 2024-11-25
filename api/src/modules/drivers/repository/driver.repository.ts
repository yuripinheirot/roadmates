import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.driver.findMany();
  }
}
