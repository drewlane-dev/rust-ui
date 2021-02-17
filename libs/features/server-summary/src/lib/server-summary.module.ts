import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerSummaryComponent } from './server-summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  declarations: [ServerSummaryComponent]
})
export class ServerSummaryModule {}
