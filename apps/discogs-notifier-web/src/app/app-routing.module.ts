import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'nested-router',
    loadChildren: () => import('@best-practice/features/nested-router').then(m => m.NestedRouterModule),
  },
  {
    path: 'table',
    loadChildren: () => import('@best-practice/features/table').then(m => m.TableModule),
  },
  {
    path: 'table/for-sale',
    loadChildren: () => import('@best-practice/features/table').then(m => m.TableModule),
  },
  {
    path: 'home',
    loadChildren: () => import('@best-practice/features/home').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('@best-practice/features/login').then(m => m.LoginModule),
  },
  {
    path: 'auth-redirect',
    loadChildren: () => import('@best-practice/common/auth').then(m => m.AuthModule),
  },
  {
    path: 'server',
    loadChildren: () => import('@best-practice/features/server').then(m => m.ServerModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
