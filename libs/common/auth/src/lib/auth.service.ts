import {Inject, Injectable} from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { AuthConfig, OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import { AuthOptions} from './auth.options';
import {distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import { ConfigService} from '@best-practice/common/config';
import {HttpClient} from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private secret: string;
  private readonly destroy$ = new Subject<void>();
  public initializationEvents = new Subject<AuthEvent>();
  public events = new Subject<AuthEvent>();
  private readonly authErrorInternal$ = new BehaviorSubject<OAuthErrorEvent>(
    null
  );
  userInfo$: Observable<any>;
  authError$: Observable<OAuthErrorEvent>;
  isLoggedIn$: Observable<boolean>;
  redirectUrl$: Observable<string>;
  config: AuthOptions;

  constructor(@Inject(DOCUMENT) private document: Document, private configService: ConfigService<AuthOptions>, private readonly http: HttpClient) {
    this.authError$ = this.authErrorInternal$.pipe(distinctUntilChanged());

    this.isLoggedIn$ = this.events.pipe(
      tap((evt) => {
        console.log(evt);
      }),
      filter(evt => evt.name === AuthEvents.AuthenticationAccessTokenObtained),
      take(1),
      map(evt => true),
      shareReplay()
    );
    this.isLoggedIn$.subscribe();


    this.userInfo$ = this.events.pipe(
      filter(evt => evt.name === AuthEvents.AuthenticationAccessTokenObtained),
      switchMap(evt => {
        return this.http.get(`${this.config.issuer}/identity`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
      }),
      tap((user) => {
        console.log(user);
      }),
      shareReplay()
    );
    this.userInfo$.subscribe();


  }

  login(redirectUrl: string = '/'): void {
    this.http.get<any>(`${this.config.issuer}/request`)
      .subscribe(res => {
        console.log(res);
        this.document.location.href = res.authorizationUrl;
      });
  }

  getAccessToken(code: string): Observable<any> {
    const body = {
      code,
    };
    return this.http
      .post<any>(`${this.config.issuer}/access`, body)
      .pipe(tap((res) => {
        console.log(res);
        if (res && res.token)
        {
          console.log(res);
          localStorage.setItem('ebay_auth_token', res.token);
          this.token = res.token;
          this.events.next(new AuthEvent(AuthEvents.AuthenticationAccessTokenObtained));
        }
      }));
  }

  logout(): void {
    this.authErrorInternal$.next(null);
  }

  isLoggedIn(): boolean {
    return true;
  }

  async setup(baseUrl = window.location.origin): Promise<any> {
    try {
      await this.configService.done;
      this.config = this.configService.get();
      if (!this.config.authEnabled) {
        this.initializationEvents.next(new AuthEvent(AuthEvents.AuthenticationInitialized));
        return this.initializationEvents.complete();
      }

      // Verify required info
      if (!this.config.issuer) {
        throw new Error('OAuth Token Issuer is not configured. Issuer is required.');
      }
      console.log('Auth is Enabled!');
      console.log(this.config);

      this.initializationEvents.next(new AuthEvent(AuthEvents.AuthenticationInitialized));
      this.events.next(new AuthEvent(AuthEvents.AuthenticationInitialized));
    } catch (err) {
      this.initializationEvents.next(new AuthEvent(AuthEvents.AuthenticationInitializationFailed, err));
    }
    this.initializationEvents.complete();
    if (localStorage.getItem('ebay_auth_token'))
    {
      this.token = localStorage.getItem('ebay_auth_token');
      this.events.next(new AuthEvent(AuthEvents.AuthenticationAccessTokenObtained));
    }
  }
}

export class AuthEvent {

  constructor(public name: AuthEvents, public value?: any) { }

}

export enum AuthEvents {
  AuthenticationInitialized = 'AuthenticationInitialized',
  AuthenticationInitializationFailed = 'AuthenticationInitializationFailed',
  AuthenticationAccessTokenObtained = 'AuthenticationAccessTokenObtained',
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  displayName: string;
}

interface UserClaims {
  'Object GUID': string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nonce: string;
  sub: string;
  'pi.sri': string;
  displayname: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
}

function mapClaimsToUserInfo(claims: UserClaims): UserInfo {
  console.log(claims);
  return {
    id: claims['Object GUID'],
    firstName: claims.firstname,
    lastName: claims.lastname,
    email: claims.email,
    username: claims.username,
    displayName: claims.displayname,
  };
}
