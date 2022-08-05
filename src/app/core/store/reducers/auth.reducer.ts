import { on } from '@ngrx/store';
import {
  login,
  loginError,
  loginSuccess,
  logoutError,
  logoutSuccess,
  refreshToken,
  refreshTokenError,
  refreshTokenSuccess
} from '../actions/auth.actions';
import { AuthState } from '../state/auth.state';
import { createRehydrateReducer } from './rehydrate.reducer';

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createRehydrateReducer(
  'user',
  initialState,
  on(login, (state) => ({ ...state })),
  on(loginSuccess, (state, { payload }) => ({
    ...state,
    user: { ...payload },
  })),
  on(refreshToken, (state) => ({ ...state })),
  on(refreshTokenSuccess, (state, { payload }) => ({
    ...state,
    user: {
      ...state.user,
      tokens: { ...payload },
    },
  })),
  on(logoutSuccess, (state) => ({ ...state, user: null })),
  on(loginError, refreshTokenError, logoutError, (state, { payload }) => ({
    ...state,
    user: null,
  }))
);
