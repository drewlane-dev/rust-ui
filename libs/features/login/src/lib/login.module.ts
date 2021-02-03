import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NavigationModule} from '@best-practice/common/navigation';
import {LockedComponent} from './locked/locked.component';
import {AuthGuard} from '@best-practice/common/auth';
import {MatCardModule} from '@angular/material/card';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'locked',
        component: LockedComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, LockedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NavigationModule
  ]
})
export class LoginModule { }
