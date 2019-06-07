import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

import { ErrorHttpStatus } from '../interfaces/http.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorMessage = exception.message.error || exception.message;
    const status = exception.getStatus();

    response
      .status(status)
      .jsonp({
        status: ErrorHttpStatus.Error,
        message: errorMessage,
      });
  }
}
