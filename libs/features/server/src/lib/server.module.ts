import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from './server.component';
import { NavigationModule } from '@best-practice/common/navigation';
import { ForSaleTableComponent } from '@best-practice/features/table';
import { TableModule } from '@best-practice/features/table';
import { ClientTableComponent } from '@best-practice/features/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ServerSummaryComponent } from '@best-practice/features/server-summary';


export const routes: Routes = [
  {
    path: '',
    component: ServerComponent,
    children: [
      {
        path: ':id/for-sale',
        component: ForSaleTableComponent,
      },
      {
        path: ':id/inventory',
        component: ClientTableComponent,
      },
      {
        path: ':id/summary',
        component: ServerSummaryComponent,
      },
      {
        path: ':id',
        redirectTo: ':id/summary',
      },
    ],
  },
];


@NgModule({
  declarations: [ServerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationModule,
    TableModule,
    MatTabsModule
  ],
})
export class ServerModule {}
