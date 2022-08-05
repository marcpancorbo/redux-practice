import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthState } from '../state/auth.state';

export const AUTH_SELECTOR_NAME = 'auth';

const getAuthState = (state: AppState) => state.auth;

export const isAuthenticated = createSelector(
    getAuthState,
    (state: AuthState) => state.user ? true : false
  );
export const getRefreshToken = createSelector(
  getAuthState,
  (state: AuthState) => state.user ?  state.user.tokens.refreshToken : null
);
