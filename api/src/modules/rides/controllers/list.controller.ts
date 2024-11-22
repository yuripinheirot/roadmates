import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ListParamsRequestDto } from '../dtos/list-params.request.dto';
import { ListQueryRequestDto } from '../dtos/list-query.request.dto';
import { ListService } from '../services/list.service';
import { ClassValidatorExceptionFilter } from '@/exceptions/class-validator.exception';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':customer_id')
  @UseFilters(new ClassValidatorExceptionFilter())
  async handle(
    @Param() params: ListParamsRequestDto,
    @Query() query: ListQueryRequestDto,
  ) {
    return this.listService.handle({ ...params, ...query });
  }
}
