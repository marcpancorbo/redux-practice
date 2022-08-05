import { on } from '@ngrx/store';
import { createRehydrateReducer } from 'src/app/core/store/reducers/rehydrate.reducer';
import { Todo } from '../../models/todo';
import { TodosState } from '../../models/todos.state';
import {
  changeTodoStatus,
  createTodo,
  deleteTodo,
  getTodos,
  getTodosSuccess
} from '../actions/todos.actions';

export const initialState: TodosState = {
  todos: [],
};

export const todosReducer = createRehydrateReducer(
  'todoList',
  initialState,
  on(getTodos, (state) => ({ ...state })),
  on(getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: [...todos],
  })),
  on(changeTodoStatus, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    }),
  })),
  on(createTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== id),
  }))
);
