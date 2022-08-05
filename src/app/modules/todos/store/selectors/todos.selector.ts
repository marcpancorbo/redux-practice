import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store/state/app.state';
import { TodosState } from '../../models/todos.state';

export const TODOS_SELECTOR_NAME = 'todos';

const getTodosState = (state: AppState) => state.todos;

export const getTodosList = createSelector(
  getTodosState,
  (state: TodosState) => state.todos
);
