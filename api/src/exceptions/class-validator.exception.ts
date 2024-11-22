import { CodeErrorsEnum } from '@/protocols/code-errors.type';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ClassValidatorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (
      exception instanceof BadRequestException &&
      this.isValidationError(exception)
    ) {
      const validationErrors = exception.getResponse() as any;

      const formattedErrors = this.formatValidationErrors(
        validationErrors.message,
      );

      response.status(status).json(formattedErrors);
    }

    return response.status(status).json(exception.getResponse());
  }

  private isValidationError(exception: BadRequestException): boolean {
    const response = exception.getResponse();
    if (typeof response === 'object' && response !== null) {
      const { message } = response as any;
      return (
        Array.isArray(message) &&
        message.every((msg) => typeof msg === 'string')
      );
    }
    return false;
  }

  private formatValidationErrors(messages: string[]) {
    return {
      error_code: CodeErrorsEnum.INVALID_DATA,
      error_description: messages,
    };
  }
}
