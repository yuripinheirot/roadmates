import { Module } from '@nestjs/common';
import { EstimateService } from './services/estimate.service';
import { EstimateController } from './controllers/estimate.controller';
import { RideRepositoryService } from './repository/ride-repository.service';
import { PrismaService } from '@/services/prisma.service';
import { ConfirmController } from './controllers/confirm.controller';
import { ConfirmService } from './services/confirm.service';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';
import { HttpModule } from '@nestjs/axios';
import { GoogleCalculateRouteService } from '@/providers/google-api/google-calculate-route.service';

@Module({
  imports: [HttpModule],
  controllers: [EstimateController, ConfirmController, ListController],
  providers: [
    EstimateService,
    RideRepositoryService,
    PrismaService,
    ConfirmService,
    ListService,
    GoogleCalculateRouteService,
  ],
})
export class RidesModule {}
