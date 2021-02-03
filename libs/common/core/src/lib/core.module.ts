import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {filter, first, take, tap} from 'rxjs/operators';
import { merge} from 'rxjs';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import {APP_CONFIG, AppConfig} from './app.config';
import {OAuthModule} from 'angular-oauth2-oidc';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigEvents, ConfigModule, ConfigService} from '@best-practice/common/config';
import {AuthEvents, AuthModule, AuthService} from '@best-practice/common/auth';
import {StoreModule} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
      },
    }),
    ConfigModule,
    AuthModule,
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: provideAppConfig,
      deps: [ConfigService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: provideAppInitializer,
      deps: [ConfigService, AuthService]
    },
  ],
})
export class CoreModule { }


function provideAppConfig(configService: ConfigService<AppConfig>): AppConfig {
  return configService.get();
}

// handle app initialization events to tell angular when we are ready
// this logic should remain simple and will happen before the angular app is rendered
function provideAppInitializer(configService: ConfigService<AppConfig>, authService: AuthService): () => Promise<any> {
  return () => merge(configService.events, authService.initializationEvents).pipe(
    tap(event =>  {
        if (event.name === ConfigEvents.LoadFailed || event.name === AuthEvents.AuthenticationInitializationFailed){
            document.getElementById('initializer-loading')?.remove();
            document.getElementById('initializer-error-message').innerText += event.value.message;
            document.getElementById('initializer-error').hidden = false;
            throw new Error('Failed to initialize app!');
        }
    }),
    filter(event => event.name === AuthEvents.AuthenticationInitialized),
    tap(event => document.getElementById('initializer-loading')?.remove())
  ).toPromise();
}
