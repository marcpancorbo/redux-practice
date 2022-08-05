import { createAction, props } from '@ngrx/store';
import { Tokens, User } from '../../models/user';

export const login = createAction(
  '[Auth] login',
  props<{ user: string; key: string }>()
);
export const loginSuccess = createAction(
  '[Auth] loginSuccess',
  props<{ payload: User }>()
);
export const loginError = createAction(
  '[Auth] loginError',
  props<{ payload: any }>()
);

export const logout = createAction('[Auth] logout');
export const logoutSuccess = createAction('[Auth] logoutSuccess');
export const logoutError = createAction(
  '[Auth] logoutError',
  props<{ payload: any }>()
);

export const refreshToken = createAction('[Auth] refreshToken');
export const refreshTokenSuccess = createAction(
  '[Auth] refreshTokenSuccess',
  props<{ payload: Tokens }>()
);
export const refreshTokenError = createAction(
  '[Auth] refreshTokenError',
  props<{ payload: any }>()
);
