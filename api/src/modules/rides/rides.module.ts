import { Module } from '@nestjs/common';
import { EstimateService } from './services/estimate.service';
import { EstimateController } from './controllers/estimate.controller';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { RideRepositoryService } from './repository/ride-repository.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [EstimateController],
  providers: [
    EstimateService,
    GoogleApiService,
    RideRepositoryService,
    PrismaService,
  ],
})
export class RidesModule {}
