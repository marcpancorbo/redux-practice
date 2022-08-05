import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodosComponent } from './pages/todos/todos.component';
import { TodosService } from './services/todos.service';
import { TodosEffects } from './store/effects/todos.effects';
import { todosReducer } from './store/reducers/todos.reducer';
import { TODOS_SELECTOR_NAME } from './store/selectors/todos.selector';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    StoreModule.forFeature(TODOS_SELECTOR_NAME, todosReducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [TodosService]
})
export class TodosModule {}
