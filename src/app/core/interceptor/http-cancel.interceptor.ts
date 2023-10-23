import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SnackService } from '../components/snack/service/snack.service';
import { MensajesError } from './mensajes-error';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {

    constructor(
        private snackService: SnackService
    ) {}
    
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            debounceTime(600),
            catchError((error: any) => {
                this.snackService.error({titulo: 'Error', texto: `${MensajesError[error.status]}`});
                return throwError(() => error);
            })
        );
    }
}
