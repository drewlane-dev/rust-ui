import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedRouterComponent } from './nested-router.component';
import {RouterModule, Routes} from '@angular/router';
import { Feature1subComponent } from './feature1sub/feature1sub.component';
import { Feature1sub2Component } from './feature1sub2/feature1sub2.component';
import {NavigationModule} from '@best-practice/common/navigation';



export const routes: Routes = [
  {
    path: '',
    component: NestedRouterComponent,
    children: [
      {
        path: 'sub1',
        component: Feature1subComponent,
      },
      {
        path: 'sub2',
        component: Feature1sub2Component,
      },
      {
        path: 'recursive',
        loadChildren: () => NestedRouterModule,
      },
    ],
  },
];


@NgModule({
  declarations: [NestedRouterComponent, Feature1subComponent, Feature1sub2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationModule
  ]
})
export class NestedRouterModule { }
