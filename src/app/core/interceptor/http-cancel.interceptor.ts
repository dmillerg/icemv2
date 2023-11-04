import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { SnackService } from '../components/snack/service/snack.service';
import { MensajesError } from './mensajes-error';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
  constructor(
    private snackService: SnackService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      debounceTime(600),
      catchError((error: any) => {
        this.snackService.error({
          titulo: 'Error',
          texto: `${MensajesError[error.status]}`,
        });
        if (error.status === 401) {
          this.authService
            .logout()
            .pipe(take(1))
            .subscribe({
              next: () => {
                location.reload();
              },
            });
        }
        return throwError(() => error);
      })
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    if (localStorage.getItem('usuario')) {
      const token = JSON.parse(localStorage.getItem('usuario')!).token;
      ///administracion/obtener-datos-apariencia
      let url = request.clone({ url: `${request.url}` });
      return url.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
