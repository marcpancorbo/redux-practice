import { createReducer, on } from '@ngrx/store';
import { cleanErrors, showError } from '../actions/error-handler.actions';
import { endLoading, startLoading } from '../actions/spinner.actions';
import { SharedState } from '../state/shared-state';

export const initialState: SharedState = {
  loading: false,
  error: null,
};

export const sharedStateReducer = createReducer(
  initialState,
  on(startLoading, (state) => ({ ...state, loading: true })),
  on(endLoading, (state) => ({ ...state, loading: false })),
  on(showError, (state, { error }) => ({ ...state, error })),
  on(cleanErrors, (state) => ({ ...state, error: null }))
);
