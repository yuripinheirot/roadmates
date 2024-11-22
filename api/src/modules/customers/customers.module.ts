import { Module } from '@nestjs/common';
import { FindAllService } from './services/find-all.service';
import { FindAllController } from './controllers/find-all.controller';
import { CustomerRepository } from './repository/customer.repository';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [FindAllController],
  providers: [FindAllService, CustomerRepository, PrismaService],
})
export class CustomersModule {}
