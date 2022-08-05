import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CustomError } from '../../models/error';
import { AuthenticationService } from '../../services/authentication.service';
import { logout } from '../../store/actions/auth.actions';
import { isAuthenticated } from '../../store/selectors/auth.selector';
import { getError } from '../../store/selectors/shared.selector';
import { AppState } from '../../store/state/app.state';
import { SharedState } from '../../store/state/shared-state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showSpinner$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  errorMessage$: Observable<CustomError>;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.showSpinner$ = this.store
      .select('shared')
      .pipe(map((state: SharedState) => state.loading));
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.errorMessage$ = this.store.select(getError);
  }
  ngOnInit(): void {}
  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}
