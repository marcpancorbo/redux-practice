import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  filter,
  interval,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutSuccess,
  refreshTokenError,
  refreshTokenSuccess
} from '../actions/auth.actions';
import { getRefreshToken, isAuthenticated } from '../selectors/auth.selector';
import { AppState } from '../state/app.state';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  private REFRESH_TOKEN_TIME = 10000;
  private exit$ = new Subject<boolean>();
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login(action.user, action.key).pipe(
          map((payload) => {
            this.router.navigate(['/todos']);
            return loginSuccess({
              payload: this.authService.handleJWT(payload),
            });
          }),
          catchError((err) => of(loginError({ payload: err })))
        )
      )
    )
  );

  refreshToken$: Observable<Action> = createEffect(() =>
    this.store.select(isAuthenticated).pipe(
      filter((logged) => logged),
      switchMap(() =>
        interval(this.REFRESH_TOKEN_TIME).pipe(
          withLatestFrom(this.store.select(getRefreshToken)),
          switchMap(([action, refreshToken]) =>
            this.authService.refreshToken(refreshToken).pipe(
              map((tokens) => refreshTokenSuccess({ payload: tokens })),
              catchError((err) => of(refreshTokenError({ payload: err })))
            )
          ),
          takeUntil(this.exit$)
        )
      )
    )
  );

  logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokenError, logout),
      switchMap(() => {
        this.exit$.next(true);
        return this.authService.logout().pipe(
          map(() => {
            this.router.navigate(['/access']);
            return logoutSuccess();
          })
        );
      })
    )
  );
}
