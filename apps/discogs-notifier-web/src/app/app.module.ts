import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {NavigationModule} from '@best-practice/common/navigation';
import {CoreModule} from '@best-practice/common/core';
import { ServerStoreModule } from '@best-practice/common/server-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    NavigationModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    ServerStoreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


