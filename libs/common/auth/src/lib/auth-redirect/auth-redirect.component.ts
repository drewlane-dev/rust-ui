import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {HttpClient} from '@angular/common/http';

export interface OAuthError {
  error: string;
  error_description: string;
}

export const UnknownError: OAuthError = {
  error: 'Unknown',
  error_description: 'An unknown error occurred',
};

@Component({
  selector: 'app-auth-redirect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./auth-redirect.component.css'],
  templateUrl: './auth-redirect.component.html',
})
export class AuthRedirectComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly errorMessage$: Observable<string>;
  readonly hasError$: Observable<boolean>;
  readonly isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
    this.isLoggedIn$ = auth.isLoggedIn$;
    this.errorMessage$ = auth.authError$.pipe(
      map((error) =>
        !error
          ? null
          : error.params
          ? (error.params as OAuthError)
          : UnknownError
      ),
      map((err) => (err ? err.error_description : null))
    );
    this.hasError$ = this.errorMessage$.pipe(map((err) => !!err));
  }

  ngOnInit(): Observable<string> {

    const queryParams = this.router.routerState.snapshot.root.queryParamMap;
    const tokenObs = this.auth.getAccessToken(queryParams.get('code'));

    const redirect = tokenObs.pipe(
      takeUntil(this.destroy$),
      take(1),
    );

    redirect.subscribe(async (accessToken) => {
      console.log(accessToken);
      await this.router.navigateByUrl('/home');
    });

    return redirect;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    this.auth.login();
  }
}
