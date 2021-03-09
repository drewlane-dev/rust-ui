import { ServerState } from './server.models';
import * as serverActions from './server.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: ServerState = {
  servers: [],
  loading: false,
  time: undefined,
  forsale: [],
  inventory: [],
  team: [],
  devices: []
};

const reducer = createReducer(
  initialState,
  on(serverActions.list, state => ({
    ...state,
    loading: true,
  })),
  on(serverActions.listSuccess, (state, action) => ({
    ...state,
    servers: action.servers,
    loading: false,
  })),
  on(serverActions.timeSuccess, (state, action) => ({
    ...state,
    time: action.time,
  })),
  on(serverActions.forsaleSuccess, (state, action) => ({
    ...state,
    forsale: action.forsale,
  })),
  on(serverActions.inventorySuccess, (state, action) => ({
    ...state,
    inventory: action.inventory,
  })),
  on(serverActions.teamSuccess, (state, action) => ({
    ...state,
    team: action.team,
  })),
  on(serverActions.devicesSuccess, (state, action) => ({
    ...state,
    devices: action.devices,
  }))
);

export function serverReducer(state: ServerState | undefined, action: Action): ServerState {
  return reducer(state, action);
}
