import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const url = req ? req.url : 'unknown';
    const stack = exception.stack;

    let httpException: HttpException;

    if (exception instanceof HttpException) {
      // 'exception'이 'HttpException' 인스턴스인 경우
      httpException = exception;
    } else {
      // 그렇지 않은 경우, 'InternalServerErrorException'으로 처리
      httpException = new InternalServerErrorException();
      this.logger.error('Unhandled exception', exception.stack);
    }

    const statusCode = httpException.getStatus();
    const response = httpException.getResponse();
    const message = response['message'] || 'Internal Server Error';

    const formattedResponse = {
      code: statusCode,
      message: message,
      success: false,
      data: null,
    };

    const log = { url, formattedResponse, stack };
    this.logger.error(log);

    res.status(statusCode).json(formattedResponse);
  }
}
