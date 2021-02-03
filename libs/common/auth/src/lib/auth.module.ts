import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './auth.service';
import {RouterModule, Routes} from '@angular/router';
import {AuthRedirectComponent} from './auth-redirect/auth-redirect.component';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'auth-redirect',
    component: AuthRedirectComponent,
  },
];

@NgModule({
  declarations: [AuthRedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: initializeAuth,
    deps: [AuthService]
  }]
})
export class AuthModule { }

export function initializeAuth(authService: AuthService): () => Promise<any> {
  return (): Promise<any> => {
    return authService.setup();
  };
}
