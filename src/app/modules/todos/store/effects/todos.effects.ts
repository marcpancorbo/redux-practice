import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { getTodos, getTodosSuccess } from '../actions/todos.actions';

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  getTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodos),
      switchMap((action) =>
        this.todosService.getTodos().pipe(
          map((todos) => {
            return getTodosSuccess({
              todos,
            });
          })
        )
      )
    )
  );
}
