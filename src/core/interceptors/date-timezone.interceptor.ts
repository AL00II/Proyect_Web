import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class DateTimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.convertDates(data))
    );
  }

  private convertDates(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.convertDates(item));
    }

    if (typeof data === 'object') {
      const copy: any = {};
      for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;

        const value = data[key];

        if (value instanceof Date) {
          copy[key] = dayjs(value).tz('America/Mexico_City').format();
        } else if (typeof value === 'object') {
          copy[key] = this.convertDates(value);
        } else {
          copy[key] = value;
        }
      }
      return copy;
    }

    return data;
  }
}
