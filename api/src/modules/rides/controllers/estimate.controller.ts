import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseFilters,
} from '@nestjs/common';
import { EstimateService } from '../services/estimate.service';
import { EstimateRequestDto } from '../dtos/estimate.request.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { formatResponseError } from '@/utils/format-response-error.util';
import { ClassValidatorExceptionFilter } from '@/exceptions/class-validator.exception';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  // TODO: Implement response schema for this endpoint equal documentation
  @Post('estimate')
  @UseFilters(new ClassValidatorExceptionFilter())
  async handle(@Body() body: EstimateRequestDto) {
    if (body.origin === body.destination) {
      throw new BadRequestException(
        formatResponseError({
          code: CodeErrorsEnum.INVALID_DATA,
          message: 'Origin and destination cannot be the same',
        }),
      );
    }

    return this.estimateService.handle(body);
  }
}
