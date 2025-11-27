import { type ArgumentsHost, Catch, type ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { HttpAdapterHost } from "@nestjs/core";
import { AppError } from "#/util/app-error";

@Catch()
export class GlobalFilter implements ExceptionFilter {
  private readonly httpAdapterHost: HttpAdapterHost;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapterHost = httpAdapterHost;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody = {
      code: "ERR",
      message: (exception as Error).message,
      details: (exception as Error).cause,
    };
    if (exception instanceof AppError) {
      httpStatus = Number(exception.statusCode);
      responseBody = exception.serialize();
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
