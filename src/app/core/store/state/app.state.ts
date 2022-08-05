import { TodosState } from 'src/app/modules/todos/models/todos.state';
import { TODOS_SELECTOR_NAME } from 'src/app/modules/todos/store/selectors/todos.selector';
import { authReducer } from '../reducers/auth.reducer';
import { sharedStateReducer } from '../reducers/shared-state.reducer';
import { AUTH_SELECTOR_NAME } from '../selectors/auth.selector';
import { SHARED_SELECTOR_NAME } from '../selectors/shared.selector';
import { AuthState } from './auth.state';
import { SharedState } from './shared-state';

export class AppState {
  [AUTH_SELECTOR_NAME]: AuthState;
  [SHARED_SELECTOR_NAME]: SharedState;
  [TODOS_SELECTOR_NAME]: TodosState;
}
export const appReducer = {
  [AUTH_SELECTOR_NAME]: authReducer,
  [SHARED_SELECTOR_NAME]: sharedStateReducer,
};
