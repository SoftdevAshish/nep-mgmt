import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rethrow } from '@nestjs/core/helpers/rethrow';

export interface Response<T> {
  statusCode: number;
  outcome: string;
  result: boolean;
  message: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger: Logger = new Logger('RESPONSE ERROR INTERCEPTOR');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // console.log(data);
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          outcome: 'Success',
          result: true,
          message: data.message,
          data: data.data,
        };
      }),
      catchError((err) => {
        // console.log(err);
        this.logger.log(err);
        const result = false;
        const statusCode = err.status;
        const outcome = 'Error';
        const message = err.response.reason;
        const field = err.response.field;

        return rethrow(
          new HttpException(
            { outcome, statusCode, result, message, field },
            statusCode,
          ),
        );
      }),
    );
  }
}
