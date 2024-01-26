import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        new Logger('HTTP Request').verbose(
          `Logging HTTP request ${req.method}, ${req.originalUrl}, ${
            res.statusCode
          }, time ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
