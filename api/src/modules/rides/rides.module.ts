import { Module } from '@nestjs/common';
import { EstimateService } from './services/estimate.service';
import { EstimateController } from './controllers/estimate.controller';
import { GoogleApiService } from '@/providers/google-api/google-api.service';
import { RideRepositoryService } from './repository/ride-repository.service';
import { PrismaService } from '@/services/prisma.service';
import { ConfirmController } from './controllers/confirm.controller';
import { ConfirmService } from './services/confirm.service';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';

@Module({
  controllers: [EstimateController, ConfirmController, ListController],
  providers: [
    EstimateService,
    GoogleApiService,
    RideRepositoryService,
    PrismaService,
    ConfirmService,
    ListService,
  ],
})
export class RidesModule {}
