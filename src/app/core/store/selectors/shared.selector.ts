import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { SharedState } from '../state/shared-state';

export const SHARED_SELECTOR_NAME = 'shared';

const getSharedState = (state: AppState) => state.shared;

export const getError = createSelector(
  getSharedState,
  (state: SharedState) => state.error
);
