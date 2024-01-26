import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    // exception instanceof HttpException
    //   ? typeof exception.getResponse() === 'object'
    //     ? exception.getResponse()
    //     : { message: exception.getResponse() }
    //   : exception instanceof Error
    //     ? { message: exception.message, error: exception.name }
    //     : {};
    let exceptionResponce: object = {};
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res == 'object') {
        exceptionResponce = res;
      } else {
        exceptionResponce = { message: res };
      }
    } else if (exception instanceof Error) {
      const message = exception.message;

      exceptionResponce = { message: message, error: exception.name };
    } else {
      exceptionResponce = {};
    }

    const responseBody = {
      ...exceptionResponce,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
