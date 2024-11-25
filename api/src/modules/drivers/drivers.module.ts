import { Module } from '@nestjs/common';
import { FindAllService } from './services/find-all.service';
import { FindAllController } from './controllers/find-all.controller';
import { DriverRepository } from './repository/driver.repository';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [FindAllController],
  providers: [FindAllService, DriverRepository, PrismaService],
})
export class DriversModule {}
