import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@halo/common/shared';
import { provideMockLogger } from '@halo/testing/test-fixtures';
import { configureTestSuite } from 'ng-bullet';
import { AuthRedirectComponent } from './auth-redirect.component';
import { AuthService } from '../auth.service';
import { OAuthErrorEvent } from 'angular-oauth2-oidc';
import { cold } from 'jasmine-marbles';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthRedirectComponent', () => {
  let fixture: ComponentFixture<AuthRedirectComponent>;
  let component: AuthRedirectComponent;
  let auth: jasmine.SpyObj<AuthService>;
  let router: Router;

  configureTestSuite(() => {
    auth = jasmine.createSpyObj('auth', ['login']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [AuthRedirectComponent],
      providers: [
        provideMockLogger(),
        { provide: AuthService, useValue: auth },
      ],
    });
  });

  beforeEach(() => {
    auth = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('error messages mapped correctly', () => {
    // Arrange
    const oAuthEvent1 = new OAuthErrorEvent('jwks_load_error', undefined, {
      error: 'jkws_load_error',
      error_description: 'url not found',
    });
    const oAuthEvent2 = new OAuthErrorEvent(
      'invalid_nonce_in_state',
      undefined,
      {
        error: 'invalid_nonce_in_state',
        error_description: 'invalid nonce bro',
      }
    );
    auth.authError$ = cold('ab', { a: oAuthEvent1, b: oAuthEvent2 });
    fixture = TestBed.createComponent(AuthRedirectComponent);
    component = fixture.componentInstance;

    // Assert
    const expectedErrorMessages = cold('ab', {
      a: 'url not found',
      b: 'invalid nonce bro',
    });
    const expectedHasError = cold('-ab', { a: true, b: true });
    expect(component.errorMessage$).toBeObservable(expectedErrorMessages);
    expect(component.hasError$).toBeObservable(expectedHasError);
  });

  it('user is navigated to redirect url when they are logged in', () => {
    // Arrange
    auth.authError$ = EMPTY;
    auth.isLoggedIn$ = cold('ab', { a: false, b: true });
    auth.redirectUrl$ = cold('a', { a: '/env/myenv' });
    router.navigateByUrl = jasmine.createSpy();
    fixture = TestBed.createComponent(AuthRedirectComponent);
    component = fixture.componentInstance;

    // Act
    const url = component.ngOnInit();

    // Assert
    const expectedUrl = cold('-a', { a: '/env/myenv' });
    expect(url).toBeObservable(expectedUrl);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/env/myenv');
  });

  it('login', () => {
    // Arrange
    auth.authError$ = EMPTY;
    auth.isLoggedIn$ = EMPTY;
    auth.redirectUrl$ = EMPTY;
    fixture = TestBed.createComponent(AuthRedirectComponent);
    component = fixture.componentInstance;

    // Act
    const url = component.login();

    // Assert
    expect(auth.login).toHaveBeenCalled();
  });
});
