import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isAuthenticated } from '../store/selectors/auth.selector';
import { AppState } from '../store/state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if (!authenticate) {
          return false;
        }
        return true;
      })
    );
  }
}
