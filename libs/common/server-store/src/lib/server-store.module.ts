import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { serverReducer } from './store/server.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ServerEffects } from './store/server.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('servers', serverReducer),
    EffectsModule.forFeature([ServerEffects]),
  ],
})
export class ServerStoreModule {}
