import { Module } from '@nestjs/common';
import { EstimateService } from './services/estimate.service';
import { EstimateController } from './controllers/estimate.controller';
import { GoogleApiService } from '@/providers/google-api/google-api.service';

@Module({
  controllers: [EstimateController],
  providers: [EstimateService, GoogleApiService],
})
export class RidesModule {}
