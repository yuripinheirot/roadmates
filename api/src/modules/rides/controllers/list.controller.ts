import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ListParamsRequestDto } from '../dtos/list-params.request.dto';
import { ListQueryRequestDto } from '../dtos/list-query.request.dto';
import { ListService } from '../services/list.service';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class ListController {
  constructor(private readonly listService: ListService) {}

  // TODO: Implement response schema for this endpoint equal documentation
  @Get(':customer_id')
  async handle(
    @Param() params: ListParamsRequestDto,
    @Query() query: ListQueryRequestDto,
  ) {
    return this.listService.handle({ ...params, ...query });
  }
}
