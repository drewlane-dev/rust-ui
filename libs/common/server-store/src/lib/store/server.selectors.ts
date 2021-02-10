import { createSelector } from '@ngrx/store';
import { selectServerState } from './server.models';
import { ServerState } from './server.models';
import { selectQueryParams, selectRouteParams } from '@best-practice/common/router';


export const selectServers = createSelector(selectServerState, (state: ServerState) =>  {
  console.log(state);
  return state.servers;
});

export const selectServersLoading = createSelector(
  selectServerState,
  (state: ServerState) => state.loading,
);

export const selectCurrentServer = createSelector(selectRouteParams, selectServerState, (params, state) =>  {
  return state.servers.filter(server => server.id === params.id)[0];
});

export const selectCurrentServerTime = createSelector(selectRouteParams, selectServerState, (params, state) =>  {
  return state.time;
});
