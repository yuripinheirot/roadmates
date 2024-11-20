import { Module } from '@nestjs/common';
import { EstimateService } from './services/estimate.service';
import { EstimateController } from './controllers/estimate.controller';

@Module({
  controllers: [EstimateController],
  providers: [EstimateService],
})
export class RidesModule {}
