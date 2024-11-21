import { BadRequestException, Body, Controller, Patch } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ConfirmRequestDto } from '../dtos/confirm.request.dto';
import { ConfirmService } from '../services/confirm.service';
import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import { formatResponseError } from '@/utils/format-response-error.util';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class ConfirmController {
  constructor(private readonly confirmService: ConfirmService) {}

  // TODO: Implement response schema for this endpoint equal documentation
  @Patch('confirm')
  async handle(@Body() body: ConfirmRequestDto) {
    if (body.origin === body.destination) {
      throw new BadRequestException(
        formatResponseError({
          code: CodeErrorsEnum.INVALID_DATA,
          message: 'Origin and destination cannot be the same',
        }),
      );
    }

    return this.confirmService.handle(body);
  }
}
