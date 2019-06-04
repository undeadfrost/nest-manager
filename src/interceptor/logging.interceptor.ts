import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.info(`  --> ${request.method}  ${request.url}`);
    const now = Date.now();
    return next.handle().pipe(tap(() => console.info(`  <-- ${request.method}  ${request.url} ${Date.now() - now}ms`)));
  }
}