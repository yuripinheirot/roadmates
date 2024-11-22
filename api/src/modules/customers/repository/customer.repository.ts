import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customer.findMany();
  }
}
