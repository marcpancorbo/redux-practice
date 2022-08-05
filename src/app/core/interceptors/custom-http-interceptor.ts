import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomError } from '../models/error';
import { cleanErrors, showError } from '../store/actions/error-handler.actions';
import { endLoading, startLoading } from '../store/actions/spinner.actions';
import { AppState } from '../store/state/app.state';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  timer: any;
  excludedUrls: string[] = [
    'destinationcountrydetail',
    'orders',
    'addressOption',
  ];
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.checkTimer();
    if (!this.excludedUrls.some((url) => req.url.includes(url))) {
      this.timer = setTimeout(() => this.store.dispatch(startLoading()), 400);
    }
    let params = req.params;
    for (const key of req.params.keys()) {
      if (params.get(key) === undefined) {
        params = params.delete(key, undefined);
      }
    }
    req = req.clone({ params });
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.store.dispatch(endLoading());
            this.store.dispatch(cleanErrors());
            this.checkTimer();
          }
        },
        (error: HttpErrorResponse) => {
          this.checkTimer();
          this.store.dispatch(endLoading());
          if (!req.headers.getAll('handleError') && error.status !== 401) {
            const customError: CustomError = {
              id: error.error.errorId,
              status: error.status,
              message: error.error.errorMessage,
            };
            this.store.dispatch(showError({ error: customError }));
          }
        }
      )
    );
  }
  checkTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
