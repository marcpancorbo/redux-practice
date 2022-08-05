import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo';

export const getTodos = createAction('[Todos] getTodos');

export const getTodosSuccess = createAction(
  '[Todos] getTodosSuccess',
  props<{ todos: Todo[] }>()
);
export const changeTodoStatus = createAction(
  '[Todo] changeTodoStatus',
  props<{ id: string }>()
);
export const createTodo = createAction(
  '[Todo] createTodo',
  props<{ todo: Todo }>()
);
export const deleteTodo = createAction(
  '[Todo] deleteTodo',
  props<{ id: string }>()
);
