import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from './server.component';
import { NavigationModule } from '@best-practice/common/navigation';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { ForSaleTableComponent } from '../../../table/src/lib/for-sale-table/for-sale-table.component';
import { TableModule } from '@best-practice/features/table';
import { ClientTableComponent } from '../../../table/src/lib/client-table/client-table.component';
import { MatTabsModule } from '@angular/material/tabs';


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
        path: ':id',
        redirectTo: ':id/for-sale',
      },
    ],
  },
];


@NgModule({
  declarations: [ServerComponent, ServerDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationModule,
    TableModule,
    MatTabsModule
  ],
})
export class ServerModule {}
