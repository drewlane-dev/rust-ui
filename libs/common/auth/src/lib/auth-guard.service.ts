import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {mapTo, shareReplay, take} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.auth.isLoggedIn()) {
      this.auth.login(state.url);
      return of(false);
    } else {
      console.log('got here');
      const obs = this.auth.userInfo$.pipe(take(1), mapTo(true), shareReplay());
      return obs;
    }
  }
}
