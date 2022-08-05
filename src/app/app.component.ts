import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'redux-practice';
  constructor(private store: Store<AppState>) {}
}
