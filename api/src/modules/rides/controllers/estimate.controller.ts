import { Body, Controller, Post } from '@nestjs/common';
import { EstimateService } from '../services/estimate.service';
import { EstimateRequestDto } from '../dtos/estimate.request.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Post('estimate')
  async estimate(@Body() body: EstimateRequestDto) {
    return this.estimateService.handle(body);
  }
}
