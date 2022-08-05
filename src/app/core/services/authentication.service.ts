import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tokens, User } from '../models/user';
import { AppState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  login(username: string, key: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${environment.baseUrl}${environment.baseApiSolar}login`,
      { key: btoa(`${username}~${key}`) }
    );
  }
  handleJWT(jwtResponse: any) {
    if (jwtResponse && jwtResponse.accessToken) {
      const user: User = jwt_decode(jwtResponse.accessToken);
      if (!Array.isArray(user.role)) {
        user.role = [user.role];
      }
      user.tokens = jwtResponse;
      return user;
    }
    return null;
  }

  refreshToken(refreshToken: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${environment.baseUrl}${environment.baseApiSolar}refreshToken`,
      { refreshToken: refreshToken }
    );
  }
  logout(): Observable<boolean> {
    return of(true);
    return this.httpClient.post<boolean>(
      `${environment.baseUrl}${environment.baseApiSolar}logout`,
      {}
    );
  }
}
