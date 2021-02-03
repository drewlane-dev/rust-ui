import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {NavigationModule} from '@best-practice/common/navigation';
import {CoreModule} from '@best-practice/common/core';

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
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


