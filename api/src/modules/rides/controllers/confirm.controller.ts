import { Body, Controller, Patch } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ConfirmRequestDto } from '../dtos/confirm.request.dto';
import { ConfirmService } from '../services/confirm.service';

@Controller('rides')
@UseInterceptors(ClassSerializerInterceptor)
export class ConfirmController {
  constructor(private readonly confirmService: ConfirmService) {}

  @Patch('confirm')
  async handle(@Body() body: ConfirmRequestDto) {
    return this.confirmService.handle(body);
  }
}
