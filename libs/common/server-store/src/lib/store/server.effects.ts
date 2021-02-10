import { routerNavigatedAction } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { ofType, Actions, Effect, OnInitEffects } from '@ngrx/effects';
import { map, switchMap, catchError, tap, withLatestFrom, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of, forkJoin } from 'rxjs';

import * as serverActions from './server.actions';
import { AuthService } from '@best-practice/common/auth';
import { ServerService } from './server.service';

@Injectable()
export class ServerEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private serverService: ServerService,
    private store: Store,
    private router: Router,
    private auth: AuthService,
  ) {}


  @Effect()
  list = this.actions$.pipe(
    ofType(serverActions.list),
    switchMap((_) => {
      return this.serverService.list().pipe(
        map((servers) =>
          serverActions.listSuccess({
            servers,
          }),
        ),
      );
    }),
  );

  @Effect()
  time = this.actions$.pipe(
    ofType(serverActions.time),
    switchMap((action) => {
      return this.serverService.time(action.id).pipe(
        map((time) =>
          serverActions.timeSuccess({
            time,
          }),
        ),
      );
    }),
  );

  ngrxOnInitEffects(): Action {
    return { type: '[Envs] Initial Load' };
  }
}
