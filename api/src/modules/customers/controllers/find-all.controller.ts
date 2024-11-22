import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { FindAllService } from '../services/find-all.service';

@Controller('customers')
@UseInterceptors(ClassSerializerInterceptor)
export class FindAllController {
  constructor(private readonly listService: FindAllService) {}

  @Get()
  async handle() {
    return this.listService.handle();
  }
}
