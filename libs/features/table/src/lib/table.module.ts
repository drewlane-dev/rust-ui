import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table/client-table.component';
import {RouterModule, Routes} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ServerTableComponent} from './server-table/server-table.component';
import {NavigationModule} from '@best-practice/common/navigation';
import {TableComponent} from './table.component';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: ClientTableComponent,
    children: [
      {
        path: 'client',
        component: ClientTableComponent,
      },
      {
        path: 'server',
        component: ServerTableComponent,
      },
      {
        path: '',
        redirectTo: 'client',
      }
    ],
  },
];

@NgModule({
  declarations: [ClientTableComponent, ServerTableComponent, TableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    NavigationModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class TableModule { }
