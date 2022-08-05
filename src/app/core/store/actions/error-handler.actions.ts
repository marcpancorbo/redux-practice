import { createAction, props } from '@ngrx/store';
import { CustomError } from '../../models/error';

export const showError = createAction(
  '[Error Handler] showError',
  props<{ error: CustomError }>()
);
export const cleanErrors = createAction('[Error Handler] cleanErrors');
