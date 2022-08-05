import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { AppState } from 'src/app/core/store/state/app.state';
import { Todo } from '../../models/todo';
import { changeTodoStatus, getTodos } from '../../store/actions/todos.actions';
import { getTodosList } from '../../store/selectors/todos.selector';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<AppState>) {
    this.todos$ = store.select(getTodosList);
  }

  ngOnInit(): void {
    this.store
      .select(getTodosList)
      .pipe(
        tap((todo) => {
          if (todo.length === 0) {
            this.store.dispatch(getTodos());
          }
        }, take(1))
      )
      .subscribe();
  }
  changeTodoStatus(id: string) {
    this.store.dispatch(changeTodoStatus({ id }));
  }
}
